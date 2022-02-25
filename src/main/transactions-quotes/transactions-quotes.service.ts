import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionsQuotes } from './interfaces/transactions-quotes.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TransactionsQuotesService extends BaseService {
    constructor(@InjectModel('TransactionsQuotes') protected readonly model: PaginateModel<TransactionsQuotes>) {
        super(model);
    }
}
