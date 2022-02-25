import { Controller } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { PaymentModesService } from './payment-modes.service';

@Controller('payment-modes')
export class PaymentModesController extends BaseController {
    constructor(protected readonly service: PaymentModesService) {
        super(service);
    }
}





