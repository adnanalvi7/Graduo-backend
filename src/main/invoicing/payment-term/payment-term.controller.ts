import { Controller } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { PaymentTermService } from './payment-term.service';

@Controller('payment-term')
export class PaymentTermController extends BaseController {
    constructor(protected readonly service: PaymentTermService) {
        super(service);
    }
}


