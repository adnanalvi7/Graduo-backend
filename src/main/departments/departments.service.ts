import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Departments } from './interfaces/departments.interface';
import { PaginateModel } from 'mongoose';
import { map } from "lodash";

@Injectable()
export class DepartmentsService extends BaseService {
    constructor(@InjectModel('Departments') protected readonly model: PaginateModel<Departments>) {
        super(model);
    }
}
