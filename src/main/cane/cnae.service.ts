import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cnae } from './interfaces/cnae.interface';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class CnaeService extends BaseService {
    constructor(@InjectModel('Cnae') protected readonly model: mongoose.PaginateModel<Cnae>) {
        super(model);
    }
    async findAttributeList(): Promise<any>{
        return this.model.find();
    }
}
