import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Provinces } from './interfaces/provinces.interface';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class ProvincesService extends BaseService {
    constructor(@InjectModel('Provinces') protected readonly model: mongoose.PaginateModel<Provinces>) {
        super(model);
    }
    async findAttributeList(req): Promise<any>{
        if(req.body.query.region){
            req.body.query = {region:ObjectId(req.body.query.region)}
        }
        return this.model.find(req.body.query);
    }
}
