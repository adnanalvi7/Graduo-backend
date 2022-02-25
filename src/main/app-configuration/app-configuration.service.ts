import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppConfiguration } from './interfaces/app-configuration.interface'
import * as mongoose from 'mongoose';


@Injectable()
export class AppConfigurationService extends BaseService {

  constructor(@InjectModel('AppConfiguration') protected readonly model: mongoose.PaginateModel<AppConfiguration>) {
    super(model);
  }

  async findAttributeList() {
    return await this.model.find();
  }
  async findOneWithKey(req,query): Promise<any> {
    
  return await super.findOne(req,query);
    
}
}

