import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sic } from './interfaces/sic.interface';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class SicService extends BaseService {
    constructor(@InjectModel('Sic') protected readonly model: mongoose.PaginateModel<Sic>) {
        super(model);
    }
    async findAttributeList(): Promise<any>{
        return this.model.find();
    }
}
