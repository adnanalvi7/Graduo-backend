import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import * as fs from 'fs';
import * as http from 'http';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';
import { EntityService } from '../entity/entity.service';
import { UsersService } from '../users/users.service';
import { WildDuck } from './interfaces/wild-duck.interface';


@Injectable()
export class WildDuckService extends BaseService {
    constructor(@InjectModel('WildDuck')
    protected readonly model: PaginateModel<WildDuck>,
        protected readonly usersService: UsersService,
        protected readonly appConfigService: AppConfigurationService,
        protected readonly entityService: EntityService,


    ) {
        super(model);
    }
    async wildAuthenticate(req) {

        const user = await this.usersService.findOne(req, { _id: req.user._id });

        const data = { "username": user.wildduckEmail, "password": user.wildduckPassword, "scope": "master", "token": "true" };

        const headers = { 'Content-Type': 'application/json' }

        const url = process.env.WILD_DUCK_URI + '/authenticate' + (process.env.WILD_DUCK_TOKEN ? '?accessToken=' + process.env.WILD_DUCK_TOKEN : '');

        return await axios.post(url, data, { headers: headers }).then(async(response)=> {

            // await this.createStarredFolder({path:'starred'},response.data.id);

            return response.data


            
        }).catch(function (error) {

            return error;

        });
    }

    // async createStarredFolder(payload,userId) {

    //     const headers = { 'Content-Type': 'application/json' }

    //     const url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes?accessToken=' + process.env.WILD_DUCK_TOKEN;

    //     return await axios.post(url,payload, { headers: headers }).then((response) => {

    //         return response;

    //     }).catch(function (error) {

    //         return error.data;
    //     })
       
    // }

    /**
     * Delete selected mails
     *
     */

    async deleteMails(req, userId, boxId) {

        let res = {} as any;

        for (const item of req.body) {

            const url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes/' + boxId + '/messages/' + item + (process.env.WILD_DUCK_TOKEN ? '?accessToken=' + process.env.WILD_DUCK_TOKEN : '');

            await axios.delete(url).then(function (response) {

                res = response.data;

            }).catch(function (error) {

                return error;
            });
        }
        return res;

    }

    /**
     * Mark selected mails as seen or unseen
     *
     */

    async markMails(req, userId, boxId) {

        const headers = { 'Content-Type': 'application/json' }

        const url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes/' + boxId + '/messages' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

        return await axios.put(url, req.body, { headers: headers }).then(function (response) {

            return response.data;

        }).catch(function (error) {
            return error;
        });
    }

    /**
     * Download attachments from mail
     * Returns attachment url
     */

    async downloadAttachment(req, userId) {

        const folderPath = `uploads/willduck/temp/downloads/${userId}`;

        // Static path to save attachment

        const writeStreamPath = `uploads/willduck/temp/downloads/${userId}/${req.body.fileName}`;

        if (!fs.existsSync(folderPath)) {
            await fs.mkdirSync(folderPath, { recursive: true });
        };
        // WildDuck Api path to get attachment

        const url = process.env.WILD_DUCK_URI + '/users/' + userId + '/mailboxes/' + req.body.folderId + '/messages/' + req.body.mailId + '/attachments/' + req.body.attachmentId + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

        const file = fs.createWriteStream(writeStreamPath);

        await http.get(url, function (response) {

            response.pipe(file);

        }).on('error', function (error) {

            return error

        });

        return { url: writeStreamPath };


    }

    async searchMails(req, userId, boxId) {

        let url = '';

        if (req.body.nextCursor) {

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/search?query=' + req.body.query + '&mailbox=' + boxId + '&limit=10&next=' + req.body.nextCursor;

        } else {

            url = process.env.WILD_DUCK_URI + '/users/' + userId + '/search?query=' + req.body.query + '&mailbox=' + boxId + '&limit=10';

        }

        const headers = {
            "X-Access-Token": process.env.WILD_DUCK_TOKEN
        }

        return await axios.get(url, { headers: headers }).then(function (response) {

            return response.data;

        }).catch(function (error) {
            return error;
        });

    }

    async submitMessage(payload, url) {


        const headers = { 'Content-Type': 'application/json' }

        //  http://wd.optima-crm.com:8080/users/5e6f4f7f92cd850eb5c5afa6/submit?accessToken=7OwedbavPyukipVi

        return await axios.post(url, payload, { headers: headers }).then(function (response) {

            return response.data;

        }).catch(function (error) {

            return error.data;
        });
    }

   
    async getUserEmails():Promise<any> {

        return new Promise((resolve,reject)=>{

            this.usersService._findAll({}, 'email', {}).then((userData) => {

                resolve(userData);

            }).catch((err)=>{
                reject(err);
            })

        })

    }
    async getEntityEmails():Promise<any> {

        return new Promise((resolve,reject)=>{

            this.entityService._findAll({}, 'email', {}).then((entityData) => {

                resolve(entityData);
                
            }).catch((err)=>{

                reject(err);

            })

        })

    }
}
