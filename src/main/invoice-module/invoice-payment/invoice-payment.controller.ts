import { Controller } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { InvoicePaymentService } from './invoice-payment.service';

@Controller('invoice-payments')
export class InvoicePaymentController extends BaseController {

  constructor(
    protected readonly service: InvoicePaymentService,
    
  ) {
    super(service);
  }

}
