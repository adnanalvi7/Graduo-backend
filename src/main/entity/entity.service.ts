import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from './interfaces/entity.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class EntityService extends BaseService {
  constructor(@InjectModel('Entity') protected readonly model: PaginateModel<Entity>) {
    super(model);
  }
  async findAttributeList(): Promise<any> {
    const list = await this.model.find();
    return list;
  }
  async findEntities(req: any,body): Promise<any> {
    const list = await super._findAll(body.queryOptions.where,body.queryOptions.select,body.queryOptions.options);
    return list;
  }
}
