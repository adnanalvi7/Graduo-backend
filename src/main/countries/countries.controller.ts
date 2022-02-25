import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('countries')
export class CountriesController extends BaseController {
    constructor(protected readonly service: CountriesService) {
        super(service);
    }
    /** Get All*/
    @UseGuards(JwtAuthGuard)
    @Get('list')
    async findAttributeList(): Promise<any> {
        return this.service.findAttributeList();
    }
}
