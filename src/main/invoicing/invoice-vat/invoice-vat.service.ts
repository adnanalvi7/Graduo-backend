import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { InvoiceVat } from './interfaces/invoice-vat.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class InvoiceVatService extends BaseService {

  constructor(@InjectModel('InvoiceVat') protected readonly model: PaginateModel<InvoiceVat>) {
    super(model);
  }
  async findAttributeList(): Promise<any> {
    return this.model.find();;
  }
}


