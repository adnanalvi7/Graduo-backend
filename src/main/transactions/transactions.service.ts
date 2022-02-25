import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './interfaces/transactions.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TransactionsService extends BaseService {
    constructor(@InjectModel('Transactions') protected readonly model: PaginateModel<Transactions>) {
        super(model);
    }
}
