import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController extends BaseController {
    constructor(protected readonly service: CompaniesService){
        super(service);
    }
}
