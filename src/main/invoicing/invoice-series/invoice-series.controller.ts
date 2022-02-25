import { Controller } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { InvoiceSeriesService } from './invoiceseries.service';

@Controller('invoice-series')
export class InvoiceSeriesController extends BaseController {
    constructor(protected readonly service: InvoiceSeriesService) {
        super(service);
    }
}



