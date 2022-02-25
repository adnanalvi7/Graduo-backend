import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { InvoiceSeries } from './interfaces/invoice-series.interface';

@Injectable()
export class InvoiceSeriesService extends BaseService {

    constructor(@InjectModel('InvoiceSeries') protected readonly model: PaginateModel<InvoiceSeries>) {
        super(model);
    }
    async create(req, Dto: any): Promise<any> {

        if (req.body.isDefault) {

            const defaultSeries = await super._findAll({ isDefault: true }, '_id', {})
            for (const item of defaultSeries){
                await this.model.updateOne({ _id: item._id }, { $set: { "isDefault": null } })
            }
        }
        return await super.create(req, Dto);
    }
    // Todo: Adnan : user Super for update function
    async update(req, id: any, Dto: any, returnType?: string): Promise<any> {
        
        
        if (req.body.isDefault) {

            const defaultSeries = await super._findAll({ isDefault: true }, '_id', {});

            for (const item of defaultSeries){

                await this.model.updateOne({ _id: item._id }, { $set: { "isDefault": null } });

            }
        }
        return await super.update(req, id, Dto, returnType)
    }
}
