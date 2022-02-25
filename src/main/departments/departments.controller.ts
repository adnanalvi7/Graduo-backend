import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController extends BaseController {
    constructor(protected readonly service: DepartmentsService){
        super(service);
    }
}
