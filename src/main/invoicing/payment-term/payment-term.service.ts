import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common/base/base.service';
import { PaymentTerm } from './interfaces/payment-term.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

@Injectable()
export class PaymentTermService extends BaseService {

    constructor(@InjectModel('PaymentTerm') protected readonly model: PaginateModel<PaymentTerm>) {
        super(model);
    }
}
