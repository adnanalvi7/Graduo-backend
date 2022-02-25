import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionsBalance } from './interfaces/transactions-balance.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TransactionsBalanceService extends BaseService {
    constructor(@InjectModel('TransactionsBalance') protected readonly model: PaginateModel<TransactionsBalance>) {
        super(model);
    }
}
