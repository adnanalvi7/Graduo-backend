import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionsItems } from './interfaces/transactions-items.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TransactionsItemsService extends BaseService {
    constructor(@InjectModel('TransactionsItems') protected readonly model: PaginateModel<TransactionsItems>) {
        super(model);
    }
}
