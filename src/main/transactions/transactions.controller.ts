import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController extends BaseController {
    constructor(protected readonly service: TransactionsService){
        super(service);
    }
}
