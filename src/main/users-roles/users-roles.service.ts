import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersRoles } from './interfaces/users-roles.interface';
import { PaginateModel } from 'mongoose';
import { map } from "lodash";

@Injectable()
export class UsersRolesService extends BaseService {
    constructor(@InjectModel('UsersRoles') protected readonly model: PaginateModel<UsersRoles>) {
        super(model);
    }
    async findAttributeList(): Promise<any> {
        const list = await this.model.find();
        return list;
    }
    async findRole(req: any,body): Promise<any> {
        const list = await super._findAll(body.queryOptions.where,body.queryOptions.select,body.queryOptions.options);
        return list;
      }
}
