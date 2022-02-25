import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { ProfitCentersService } from './profit-centers.service';

@Controller('profit-centers')
export class ProfitCentersController extends BaseController {
  constructor(protected readonly service: ProfitCentersService) {
    super(service);
  }
  @Get('list')
  async findAttributeList(): Promise<any> {
    return this.service.findAttributeList();
  }
}





