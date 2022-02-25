
import { Controller } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { InvoiceConceptsService } from './invoice-concepts.service';

@Controller('invoice-concepts')
export class InvoiceConceptsController extends BaseController {
    constructor(protected readonly service: InvoiceConceptsService) {
        super(service);
    }
}


