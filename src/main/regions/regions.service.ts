import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Regions } from './interfaces/regions.interface';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class RegionsService extends BaseService {
    constructor(@InjectModel('Regions') protected readonly model: mongoose.PaginateModel<Regions>) {
        super(model);
    }

    async findAttributeList(req): Promise<any>{
        if(req.body.query.country){
            req.body.query = {country:ObjectId(req.body.query.country)}
        }
        return this.model.find(req.body.query);
    }
}
