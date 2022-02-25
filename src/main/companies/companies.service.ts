import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Companies } from './interfaces/companies.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CompaniesService extends BaseService {
    constructor(@InjectModel('Companies') protected readonly model: PaginateModel<Companies>) {
        super(model);
    }
}
