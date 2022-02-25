import { BaseController } from '../../common/base/base.controller';
import { Controller } from '@nestjs/common';
import { TransactionsQuotesService } from './transactions-quotes.service';

@Controller('transactions-quotes')
export class TransactionsQuotesController extends BaseController {
    constructor(protected readonly service: TransactionsQuotesService){
        super(service);
    }
}
