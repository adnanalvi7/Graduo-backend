import { Controller, UseGuards, Get } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { OutgoingMailServerService } from './outgoing-mail-server.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('outgoing-mail-server')
export class OutgoingMailServerController extends BaseController {
  constructor(
    protected readonly service: OutgoingMailServerService,

  ) {
    super(service);
  }
    /** Get All*/
    @UseGuards(JwtAuthGuard)
    @Get('list')
    async findAttributeList(): Promise<any> {
        return this.service.findAttributeList();
    }
}



