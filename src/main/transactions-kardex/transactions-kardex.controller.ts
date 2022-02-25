import { BaseController } from '../../common/base/base.controller';
import { Controller } from '@nestjs/common';
import { TransactionsKardexService } from './transactions-kardex.service';

@Controller('transactions-kardex')
export class TransactionsKardexController extends BaseController {
    constructor(protected readonly service: TransactionsKardexService){
        super(service);
    }
}
