import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';
import { Users } from './interfaces/users';

@Injectable()
export class UsersService extends BaseService {

  constructor(@InjectModel('Users')
  protected readonly model: PaginateModel<Users>,
    protected readonly appConfigService: AppConfigurationService
  ) {
    super(model);
  }

  // override the update function of base service and put a check if login user id match with updated data id then it will resolve user object with entityObj field Otherwise resolve with Dto


  async update(req, id: any, Dto: any): Promise<any> {

    return new Promise(async (resolve, reject) => {

      const user =  await this.findByEmail(Dto.email) as any;

       super.update(req, id, Dto).then( async (userData) => {

        //  if email and password is same while update then do not create wildduck Account

        if (user.wildduckEmail === Dto.wildduckEmail && user.wildduckPassword === Dto.wildduckPassword) {

          resolve({
            userData: user,
            wdResult: { success: true }
          })


        } else {
          return  this.createWildDuckUser(Dto.wildduckEmail, Dto.wildduckPassword).then(wdResult => {

            resolve({
              userData: user,
              wdResult: wdResult
            })

          })
        }
      }).catch(err => {

        reject(err);

      });
    });
  }


  public async findByEmail(email: string): Promise<any> {

    return this.model.findOne({ "email": email })
      .populate({
        path: 'entityObj',
        select: 'legalName lat lng entityAddress telephone email',
        populate: { path: 'logo', select: 'path' }
      }).lean();
  }

  async create(req, Dto: any): Promise<any> {

    return await super.create(req, Dto).then(async (userData) => {

      return await this.createWildDuckUser(userData.wildduckEmail, userData.wildduckPassword).then(wdResult => {

        return {
          userData: userData,
          wdResult: wdResult
        }

      })

    });
  }
  async createWildDuckUser(wildduckEmail, wildduckPassword) {

    const data = {
      "username": wildduckEmail,
      "password": wildduckPassword,
      "tags": [
        "status:regular_user",
        "subscription:business_big"
      ]
    };
    const headers = { 'Content-Type': 'application/json' }

    const url = process.env.WILD_DUCK_URI + '/users' + (process.env.WILD_DUCK_TOKEN ? '?accessToken=' + process.env.WILD_DUCK_TOKEN : '');

    return await axios.post(url, data, { headers: headers }).then(function (response) {

      return response.data;

    }).catch(function (error) {

      return error;

    });


  }

  async findUsersList(query): Promise<any> {
    const list = await this.model.find(query);
    return list;
  }

  async findOne(req, query: any): Promise<any> {
    if (req.query.populate) {
      return await this.modelClass.findOne(query).populate({ path: req.query.populate, select: 'path', match: { 'refModel': 'users' } }).lean();
    } else {
      return await this.modelClass.findOne(query);
    }
  }

  async addSignature( id: any, Dto: any): Promise<any> {

    return new Promise((resolve, reject) => {

      super.updateWithQuery({_id:id}, Dto).then(async (userData) => {

        resolve(userData);

      }).catch((err)=>{

        reject(err);

      });
    });

  }

  async findEmailsSignature(id: any): Promise<any> {

    return new Promise((resolve, reject) => {

      super._findOne({_id:id},'emailSignature', {}).then(async (userData) => {

        resolve(userData);

      }).catch((err)=>{

        reject(err);

      });
    });

  }
}


