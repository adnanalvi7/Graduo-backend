import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { CnaeService } from './cnae.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cnae')
export class CnaeController extends BaseController {
    constructor(protected readonly service: CnaeService) {
        super(service);
    }
    @Get('list')
    async findAttributeList(): Promise<any> {
        return this.service.findAttributeList();
    }

}
