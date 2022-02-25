import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Countries } from './interfaces/countries.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CountriesService extends BaseService {
    constructor(@InjectModel('Countries') protected readonly model: PaginateModel<Countries>) {
        super(model);
    }
    async findAttributeList(): Promise<any>{
        return this.model.find();
    }
}
