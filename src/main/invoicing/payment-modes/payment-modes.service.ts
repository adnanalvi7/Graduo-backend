import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaymentModes } from './interfaces/payment-modes.interface';

@Injectable()
export class PaymentModesService extends BaseService {
    constructor(@InjectModel('PaymentModes') protected readonly model: PaginateModel<PaymentModes>) {
        super(model);
    }
}
