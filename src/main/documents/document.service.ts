import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as _ from 'lodash';
import { PaginateModel } from 'mongoose';
import * as rimraf from 'rimraf';
import { BaseService } from '../../common/base/base.service';
import { UsersService } from '../users/users.service';
import { DocumentInterface } from './document.interface';

@Injectable()
export class DocumentService extends BaseService {

	private _destination = './uploads/documents';

	constructor(
		@InjectModel('Document')
		protected readonly model: PaginateModel<DocumentInterface>,
		protected readonly userService: UsersService

	) {
		super(model);
	}

	private _getUserHomeDirectory(userId): string {
		return `${this._destination}/${userId}`;
	}

	/**
	 * Get logged in user documents
	 * 
	 * @param req any
	 */
	public getMyDocuments(req: any) {

		req.body.queryOptions['where']['ownerId'] = req.user._id;
		req.body.queryOptions['options']['sort'] = { isFolder: -1, name: 1 };

		return this.findAll(req);

	}

	/**
	 * Find directory path recursively 
	 * (it is backward recursive function to find root from starting point)
	 * 
	 */
	private _findDirectoryPathRecursively(allFolders, currentFolder, resultFolder) {

		resultFolder.push(currentFolder);

		const parentFolderId = currentFolder['parentFolderId'] ? currentFolder['parentFolderId'].toString() : null;

		let parentFolder = _.find(allFolders, (o) => { return o['_id'].toString() == parentFolderId });

		if (parentFolder) {

			return this._findDirectoryPathRecursively(allFolders, parentFolder, resultFolder);

		}
		else {

			let dirPath = '';
			_.each(resultFolder, (o) => { dirPath = o['name'] + '/' + dirPath; })

			return dirPath;
		}


	}

	/**
	 * get full path of directory in which files are.
	 * 
	 * @param userId string
	 * @param currentFolderId string
	 */
	private async _getFullPathToFolder(userId, currentFolderId) {

		let fullPath = this._getUserHomeDirectory(userId);

		if (currentFolderId) {

			const allFolders = await this._findAll({ isFolder: true, ownerId: userId }, null, {});

			let currentFolderObj = _.find(allFolders, (o) => { return o['_id'] == currentFolderId });

			let dirPath = '';

			if (currentFolderObj) {
				dirPath = this._findDirectoryPathRecursively(allFolders, currentFolderObj, []);
				fullPath = this._getUserHomeDirectory(userId) + '/' + dirPath;
			}
		}

		return fullPath;

	}


	/**
	 * Upload file and save record in database.
	 * 
	 * @param req any
	 * @param file any
	 */
	async upload(req: any, file: any) {

		let parentFolderId = null;

		if (req.body['parentFolderId'] && req.body['parentFolderId'] != 'null') {
			parentFolderId = req.body['parentFolderId'];
		}

		try {

			const dir = await this._getFullPathToFolder(req.user._id, parentFolderId);

			if (!fs.existsSync(dir)) { await fs.mkdirSync(dir, { recursive: true }); };

			return new Promise((resolve, reject) => {

				fs.rename(req.file.path, dir + "/" + req.file.originalname, err => {

					if (err) { reject(err); }
					else {

						let findWhere = { isFolder: false, ownerId: req.user._id, name: file.originalname }

						findWhere['parentFolderId'] = parentFolderId;
						// if (parentFolderId) {
						// 	findWhere['parentFolderId'] = parentFolderId;
						// }

						return this.findOne(req, findWhere).then(findResult => {

							const saveData = {
								isFolder: false,
								ownerId: req.user._id,
								name: file.originalname,
								filename: file.filename,
								mimeType: file.mimetype,
								sizeInBytes: file.size,
								sizeInKBs: Math.round((file.size / 1024) * 100) / 100,
								sizeInMBs: Math.round(((file.size / 1024) / 1024) * 100) / 100,
							};
							if (parentFolderId) { saveData['parentFolderId'] = parentFolderId }

							if (!findResult) {
								// Insert Record
								return this.create(req, saveData).then(result => { resolve(result); })

							}
							else {
								// Update Record
								return this.update(req, findResult['_id'], saveData).then(result => { resolve(result); })
							}
						})
					}
				});
			})

		} catch (error) { return error; }
	};


	/**
	 * Create Folder and sav record in database.
	 * 
	 * @param req any
	 */
	async createFolder(req) {

		// payload data
		const pd = req.body;

		const findWhere = { ownerId: req.user._id, isFolder: true, parentFolderId: pd.parentFolderId, name: pd.name };
		const findResult = await this.findOne(req, findWhere);

		if (!findResult) {

			let dir = await this._getFullPathToFolder(req.user._id, pd.parentFolderId);
			dir = dir + '/' + req.body.name;

			return new Promise((resolve, reject) => {

				fs.mkdir(dir, { recursive: true }, (err) => {
					if (err) { reject(err) }
					else { resolve(true); }
				});

			}).then(mkdirRes => {

				// Save record in database 
				const saveData = {
					isFolder: true,
					parentFolderId: pd.parentFolderId,
					ownerId: req.user._id,
					name: pd.name
				}

				return this.create(req, saveData).then(() => {
					return { status: true, message: 'folder created' };
				})
			})
		}
		else {
			return { status: false, message: 'folder already exist with same name' }
		}
	}

	/**
	 * Rename / update folder
	 * 
	 * @param req any
	 * @param body any
	 * @param _id string
	 */
	async updateFolder(req, body, _id) {

		const findWhere = {
			_id: { $ne: _id },
			ownerId: req.user._id, isFolder: true, parentFolderId: body.parentFolderId, name: body.name,
		};
		const alreadyExist = await this.findOne(req, findWhere);

		const oldFolder = await this.findOne(req, { _id: _id });

		if (!alreadyExist) {

			let dir = await this._getFullPathToFolder(req.user._id, body.parentFolderId);
			let newPath = dir + '/' + req.body.name;
			let oldPath = dir + '/' + oldFolder['name'];

			await fs.renameSync(oldPath, newPath)

			// Update record in database 
			const data = { name: body.name }
			return this.update(req, _id, data).then(() => {
				return { status: true, message: 'folder updated' }
			})

		}
		else {
			return { status: false, message: 'folder already exist with same name' }
		}
	}

	/**
	 * Delete selected mails
	 *
	 */
	async deleteDocuments(req) {

		let returnResult = [];// as any;

		for (const _id of req.body) {

			const res = await this.delete(req, _id);
			returnResult.push(res);

		}

		return returnResult;

	}

	/**
	 * 
	 * Delete file
	 * 
	 * 	- If file is deleted
	 * 		- Find record from database
	 * 		- Find path to that file recursively.
	 * 		- Delete file
	 * 		- Delete record
	 * 
	 * @param req any
	 * @param id any
	 */
	async delete(req, id: any): Promise<any> {

		const docRecord = await this.findOne(req, { _id: id, ownerId: req.user._id });

		if (docRecord) {

			if (!docRecord['isFolder']) {
				return this._deleteSingleFile(req, docRecord);
			}
			else {
				return this._deleteEntireFolder(req, docRecord);
			}
		}
		else {
			return { status: false, message: 'file not found' };
		}

	}


	/**
	 * Delete single file from storage and db
	 * 
	 * @param req any
	 * @param fileRecord any
	 */
	private async _deleteSingleFile(req, fileRecord) {

		// Find path recursively
		const parentFolderId = fileRecord['parentFolderId'] ? fileRecord['parentFolderId'].toString() : null;

		let dir = await this._getFullPathToFolder(req.user._id, parentFolderId);

		if (fs.existsSync(dir)) {

			let file = dir + '/' + fileRecord['name'];

			await fs.unlinkSync(dir + '/' + fileRecord['name']);

		};

		return super.delete(req, fileRecord._id);
	}

	/**
	 * Delete entire folder
	 * 
	 * @param req any
	 * @param folderRecord any
	 */
	private async _deleteEntireFolder(req, folderRecord) {

		// find all files and folders records in current folder.
		const allDocsOfUser = await this._findAll({ ownerId: req.user._id }, null, {});

		const allDocsForDel = this._findAllDocsInFolderRecursively(allDocsOfUser, folderRecord['_id'], [folderRecord]);

		if (allDocsForDel.length) {

			const parentFolderId = folderRecord['parentFolderId'] ? folderRecord['parentFolderId'].toString() : null;
			let dir = await this._getFullPathToFolder(req.user._id, parentFolderId);

			if (fs.existsSync(dir)) {

				dir = dir + '/' + folderRecord['name'];

				// Using rimraf because rmdir is not working on linux.
				await rimraf.sync(dir);
				// await fs.rmdirSync(dir, { recursive: true });

			};

			const delCondition = { _id: { $in: _.map(allDocsForDel, '_id') } };
			return this.deleteMany(req, delCondition);

		}
		else {
			return { status: false, message: 'unable to find anything to delete' }
		}

	}

	/**
	 * Find all documents recursively for deletion
	 * 
	 *  (it is forward recursive function to find all items in nested folders)
	 * 
	 * @param allDocs any
	 * @param currentFolderId string
	 * @param result any[]
	 */
	private _findAllDocsInFolderRecursively(allDocs, currentFolderId, result) {

		currentFolderId = currentFolderId ? currentFolderId.toString() : null;

		let subItems = _.filter(allDocs, (o) => {
			return o['parentFolderId'] && o['parentFolderId'].toString() == currentFolderId
		});

		if (subItems.length) {

			_.each(subItems, (subItem) => {

				result.push(subItem);


				if (subItem['isFolder']) {

					return this._findAllDocsInFolderRecursively(allDocs, subItem['_id'], result);

				}

			})

		}

		return result;

	}

	public async getAllFolders(req) {

		const foldersDataSet = await this._findAll({ isFolder: true, ownerId: req.user._id }, null, {});

		let children = [];
		let organizedDataset = this._findAllSubFolders(foldersDataSet, {}, children);
		return { _id: null, name: 'Root', children: children };

	}

	private _findAllSubFolders(foldersDataSet, parentFolder, children) {

		const parentFolderId = parentFolder['_id'] ? parentFolder['_id'].toString() : null;

		let subFolders = _.filter(foldersDataSet, (o) => {
			return o['parentFolderId'] == parentFolderId
		});

		_.each(subFolders, (item) => {
			let i = { _id: item._id, parentFolderId: item['parentFolderId'], name: item['name'], children: [] };

			children.push(i);

			return this._findAllSubFolders(foldersDataSet, item, i['children']);
		})

		return children;

	}

	/**
	 * Move Document (file or folder) to any location
	 * 
	 * @param req any
	 * @param pd any
	 */
	public async moveDocument(req, pd) {

		let returnResult = [];

		for (const item of pd) {

			const docRecord = await this.findOne(req, { _id: item['document']['_id'] });

			let response;

			if (docRecord) {

				const folderWithSameNameExist = await this._isFolderWithSameNameExist(req, docRecord['name'], item['destinationFolderId']);

				if (folderWithSameNameExist) {
					response = { status: false, message: 'document already exist with same name' }
				}
				else {

					let fromPath = await this._getFullPathToFolder(req.user._id, item['document']['parentFolderId']);
					fromPath = fromPath + '/' + docRecord['name'];

					let toPath = await this._getFullPathToFolder(req.user._id, item['destinationFolderId']);
					toPath = toPath + '/' + docRecord['name'];

					if (docRecord.isFolder) {
						await fsExtra.moveSync(fromPath, toPath); // As per we need to move entire directory with content
					}
					else {
						await fs.renameSync(fromPath, toPath);
					}


					let data = {};

					if (item['destinationFolderId']) {
						data = { parentFolderId: item['destinationFolderId'] };
					}
					else {
						data = { '$unset': { parentFolderId: "" } };

					}

					await this.update(req, item['document']['_id'], data).then(() => {
						response = { status: true };
					});

				}


			} else {
				response = { status: false, message: 'file not found' }
			}

			returnResult.push(response);
		}

		return returnResult;



	}

	/**
	 * Check if file/folder with same name exists in destination folder.
	 * 
	 * @param req any
	 * @param name string
	 * @param destinationFolderId string
	 */
	private async _isFolderWithSameNameExist(req, name, destinationFolderId) {

		let existRecord = await this.findOne(req, { name: name, parentFolderId: destinationFolderId });

		return existRecord ? true : false;

	}


	/**
	 * Download file.
	 * 
	 * @param req any
	 * @param res any
	 * @param _id string
	 */
	public async downloadFile(req, res, _id) {

		const ownerId = req.query.owner?req.query.owner:req.user._id;
				
		const fileRecord = await this.findOne(req, { _id: _id, ownerId: ownerId });

		if (fileRecord) {

			const parentFolderId = fileRecord['parentFolderId'] ? fileRecord['parentFolderId'].toString() : null;

			let dir = await this._getFullPathToFolder(ownerId, parentFolderId);

			let filePath = dir + '/' + fileRecord['name'];

			// TODO:Medium: Need to handle exception if file not found.

			return res.sendFile(filePath, { root: '.' });

		}

		return { status: false, message: 'file not found.' };
	}


}
