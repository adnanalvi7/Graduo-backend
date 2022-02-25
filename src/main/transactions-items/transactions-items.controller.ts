import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { TransactionsItemsService } from './transactions-items.service';

@Controller('transactions-items')
export class TransactionsItemsController extends BaseController {
    constructor(protected readonly service: TransactionsItemsService){
        super(service);
    }
}
