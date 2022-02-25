
import { BaseService } from '../../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ProfitCenters } from './interfaces/profit-centers.interface';

@Injectable()
export class ProfitCentersService extends BaseService {
  constructor(@InjectModel('ProfitCenters') protected readonly model: PaginateModel<ProfitCenters>) {
    super(model);
  }
  async findAttributeList(): Promise<any> {
    return this.model.find();;
  }
}


