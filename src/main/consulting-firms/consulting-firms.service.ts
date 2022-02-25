import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConsultingFirms } from './interfaces/consulting-firms.interface';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


@Injectable()
export class ConsultingFirmsService extends BaseService {
    constructor(@InjectModel('ConsultingFirms') protected readonly model: mongoose.PaginateModel<ConsultingFirms>) {
        super(model);
    }
    async findAttributeList(req): Promise<any>{
        if(req.body.query.province){
            req.body.query = {province:ObjectId(req.body.query.province)}
        }
        return this.model.find(req.body.query);
    }
}
