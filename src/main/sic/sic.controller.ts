import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { SicService } from './sic.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sic')
export class SicController extends BaseController {
    constructor(protected readonly service: SicService) {
        super(service);
    }
    @Get('list')
    async findAttributeList(): Promise<any> {
        return this.service.findAttributeList();
    }

}
