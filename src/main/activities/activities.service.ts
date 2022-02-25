import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Activities } from './interfaces/activities.interface';


@Injectable()
export class ActivitiesService extends BaseService {
    constructor(@InjectModel('Activities') protected readonly model: PaginateModel<Activities>) {
        super(model)
    }
    async findActivities(): Promise<any> {
        return super._findAll({},'',{})
    }
}

