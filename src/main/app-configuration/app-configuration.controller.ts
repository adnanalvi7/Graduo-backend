import { Controller, Get, Post,Request } from '@nestjs/common';
import { AppConfigurationService } from './app-configuration.service';
import { BaseController } from '../../common/base/base.controller';

@Controller('app-configuration')
export class AppConfigurationController extends BaseController {

  constructor(protected readonly service: AppConfigurationService) {
    super(service);
  }

  @Get('list')
  async findAttributeList() {
    return await this.service.findAttributeList();
  }
  @Post('find')
  async findOneWithKey(@Request() req) {
    return await this.service.findOneWithKey(req,req.body.queryOptions);
  }
}
