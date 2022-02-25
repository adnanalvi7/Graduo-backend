import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { DocumentService } from '../documents/document.service';
import { SharedDocumentsInterface } from './shared-documents.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class SharedDocumentsService extends BaseService {


	constructor(
		@InjectModel('SharedDocuments')
		protected readonly model: PaginateModel<SharedDocumentsInterface>,
		protected readonly documentsService: DocumentService,
		protected readonly userService: UsersService

	) {
		super(model);
	}

	/**
     * Create share-documents collecion
	 * If user and document already found only update permission
     *
     */

	async create(req, Dto: any): Promise<any> {

		let response = {};

		for (const documents of req.body.documentsId) {

			for (const users of req.body.users) {

				const userData = await super.findOne(req, { sharedWith: users, documentId: documents });

				if (userData) {

					Dto = {
						permission: req.body.permission
					}
					await super.update(req, userData._id, Dto).then(async (data) => {

						await super._findAll({ $and: [{ documentId: documents, ownerId: req.user._id }] }, '', {}).then(async (documentsData) => {

							const sharedWith = [];

							for (const item of documentsData) {

								sharedWith.push(item.sharedWith);
							}


							response = { status: true, sharedWith: sharedWith };


						}).catch((err) => {

							return err;
						})

					}).catch((err) => {

						return err;
					})

				} else {

					Dto = {
						...Dto,
						sharedWith: users,
						ownerId: req.user._id,
						documentId: documents, // file or folder
					};

					await super.create(req, Dto).then(async () => {

						await super._findAll({ $and: [{ documentId: documents, ownerId: req.user._id }] }, '', {}).then(async (documentsData) => {

							const sharedWith = [];

							for (const item of documentsData) {

								sharedWith.push(item.sharedWith);
							}


							response = { status: true, sharedWith: sharedWith };


						}).catch((err) => {

							return err;
						})

					}).catch((err) => {

						return err;
					})
				}



			}
		}
		return response;

	}
	/**
	 * 
	 * unShare documents
	 * 
	 * @param req any
	 * @param documentId any
	 * @param sharedWith any
	 */
	async unShareDocuments(req, sharedWith, documentId): Promise<any> {

		const condition = { sharedWith: sharedWith, documentId: documentId }

		return await super.deleteMany(req, condition)


	}


	/**
	 * CHANGE DOCUMENTS PERMISSIONS
	 */

	async changePermission(req, body, sharedWith, documentId): Promise<any> {
		const where = { sharedWith: sharedWith, documentId: documentId };
		return await super._findOne(where, '', {}).then(async (res) => {
			return await this.updateWithQuery({ _id: res._id }, body);
		})
	}
	/**
	 * 
	 * get documents shared with user
	 * 
	 * @param req any
	 */
	async sharedWithMeDocuments(req): Promise<any> {

		const documents = [] as any;

		const where = { sharedWith: req.user._id, ownerId: req.body.ownerId };

		return await super._findAll(where, '', {}).then(async (res) => {

			for (const document of res) {

				// used for searching documents via its name

				const where = req.body.where ? req.body.where : {}

				await this.documentsService._findOne({ $and: [{ _id: document.documentId }, where] }, '', {}).then(async (documentData) => {

					if (documentData) {

						documents.push(documentData);

					}

				}).catch(err => {

					return err
				})
			}
			return documents;

		}).catch(err => {
			return err
		})

	}

	/**
	 * 
	 * get documents shared with others from current login user
	 * 
	 * @param req any
	 */

	async sharedWithOthers(req): Promise<any> {

		const documents = [] as any;

		// get documents where owner id is equal to login user's id

		const where = { ownerId: req.user._id };

		return await super._findAll(where, '', {}).then(async (res) => {

			// get documents according to document's _id that is stored in shared documents collection

			for (const document of res) {

				// used for searching documents via its name (only)

				const where = req.body.where ? req.body.where : {}

				await this.documentsService._findOne({ $and: [{ _id: document.documentId }, where] }, '', {}).then(async (documentData) => {

					if (documentData) {

						documents.push(documentData);

					}
				}).catch(err => {
					return err
				})
			}

			// Array of documents that has been shared with other users
			const filteredDocuments = _.uniqBy(documents, function (p) { return p.filename; });
			return filteredDocuments;

		}).catch(err => {

			return err;

		})

	}
	/**
	 * 
	 * get default folders (i-e: my share and owner's folders)
	 * 
	 * @param req any
	 */
	async getFolders(req): Promise<any> {

		const filteredFolders = [] as any;

		// get all result where files has been shared with current user from shared documents 

		const where = { sharedWith: req.user._id };

		return await super._findAll(where, '', { populate: { path: 'ownerId', select: 'email legalName' } }).then(async (res) => {

			// get owner id and email from result and map array to get owner's folders object

			const foldersArray = await res.map(function (item) {
				return {
					_id: item.ownerId._id,
					isFolder: true,
					FolderType: 'users',
					name: item.ownerId.email,
				};

			});

			// push my share folder object in array 

			filteredFolders.push({
				_id: 'myShared',
				isFolder: true,
				parentFolderId: null,
				name: 'my share',
			})

			// filter duplicates folders from array 

			const folders = _.uniqBy(foldersArray, function (p) { return p.email; });
			for (const folder of folders) {
				filteredFolders.push(folder);
			}

			return filteredFolders;

		}).catch(err => {
			return err
		})

	}
	/**
	 * Get documents shared with user according to folder 
	 * 
	 * @param req any
	 */
	public getMyDocuments(req: any) {

		req.body.queryOptions['options']['sort'] = { isFolder: -1, name: 1 };
		return this.documentsService.findAll(req);

	}

	async findSharedUsersList(req) {

		let response = [] as any;

		await super._findAll({ documentId: req.body.documentId }, '', { populate: { path: 'sharedWith', select: 'legalName email createAt' } }).then(async (documentsData) => {

			const sharedWith = [];

			for (const item of documentsData) {

				sharedWith.push(item.sharedWith);
			}


			response = sharedWith;


		}).catch((err) => {

			return err;
		})

		return response;

	}

	async findUsersList(req, query) {

		if (query.email && req.body.sharedWith.length > 0) {

			query = {
				$and: [
					query,
					{ _id: { $nin: req.body.sharedWith } }
				]
			}

		} else if (req.body.sharedWith.length > 0) {

			query = { _id: { $nin: req.body.sharedWith } }

		}else {
			query = { _id: { $nin:[req.user._id] } }

		}
		return await this.userService.findUsersList(query).then((list) => {

			return list;

		})
	}

}
