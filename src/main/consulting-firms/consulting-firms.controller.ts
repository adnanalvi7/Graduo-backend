import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request, UseGuards, Post } from '@nestjs/common';
import { ConsultingFirmsService } from './consulting-firms.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('consulting-firms')
export class ConsultingFirmsController extends BaseController {
    constructor(protected readonly service: ConsultingFirmsService) {
        super(service);
    }
    /** Get All*/
    @UseGuards(JwtAuthGuard)
    @Post('list')
    async findAttributeList(@Request() req): Promise<any> {
        return this.service.findAttributeList(req);
    }
}
