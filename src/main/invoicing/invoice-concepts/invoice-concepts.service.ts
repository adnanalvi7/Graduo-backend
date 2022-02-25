import { BaseService } from '../../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { InvoiceConcepts } from './interfaces/invoice-concepts.interface';

@Injectable()
export class InvoiceConceptsService extends BaseService {
    constructor(@InjectModel('InvoiceConcepts') protected readonly model: PaginateModel<InvoiceConcepts>) {
        super(model);
    }
}
