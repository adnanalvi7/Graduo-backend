import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request, UseGuards, Post } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('regions')
export class RegionsController extends BaseController {
    constructor(protected readonly service: RegionsService) {
        super(service);
    }

    /** Get All*/
    @UseGuards(JwtAuthGuard)
    @Post('list')
    async findAttributeList(@Request() req): Promise<any> {
        return this.service.findAttributeList(req);
    }
}
