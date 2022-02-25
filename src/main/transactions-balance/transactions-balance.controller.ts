import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { TransactionsBalanceService } from './transactions-balance.service';

@Controller('transactions-balance')
export class TransactionsBalanceController extends BaseController {
    constructor(protected readonly service: TransactionsBalanceService){
        super(service);
    }
}
