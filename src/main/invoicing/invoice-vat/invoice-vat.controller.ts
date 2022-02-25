import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { InvoiceVatService } from './invoice-vat.service';

@Controller('invoice-vat')
export class InvoiceVatController extends BaseController {
  constructor(protected readonly service: InvoiceVatService) {
    super(service);
  }
  @Get('list')
  async findAttributeList(): Promise<any> {
    return this.service.findAttributeList();
  }
}

