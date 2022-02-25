import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { College } from './interfaces/college.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CollegeService extends BaseService {
    constructor(@InjectModel('College') protected readonly model: PaginateModel<College>) {
        super(model);
    }
}
