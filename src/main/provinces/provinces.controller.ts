import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request, UseGuards, Post } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('provinces')
export class ProvincesController extends BaseController {
    constructor(protected readonly service: ProvincesService) {
        super(service);
    }

    /** Get All*/
    @UseGuards(JwtAuthGuard)
    @Post('list')
    async findAttributeList(@Request() req): Promise<any> {
        return this.service.findAttributeList(req);
    }
}
