import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionsKardex } from './interfaces/transactions-kardex.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TransactionsKardexService extends BaseService {
  constructor(@InjectModel('TransactionsKardex') protected readonly model: PaginateModel<TransactionsKardex>) {
    super(model);
  }
}
