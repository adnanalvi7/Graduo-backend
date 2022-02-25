import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Parser, transforms } from 'json2csv';
import { PaginateModel } from 'mongoose';
import * as builder from 'xmlbuilder';
import { BaseService } from '../../../common/base/base.service';
import { InvoiceMovements } from './interfaces/invoice-movement.interface';

@Injectable()
export class InvoiceMovementsService extends BaseService {
  constructor(@InjectModel('InvoiceMovement') protected readonly model: PaginateModel<InvoiceMovements>) {
    super(model);
  }
  async findByDate(body): Promise<any> {
    // const where = { 'createAt': body.createAt };

    return super._findAll(body, '', {

      populate: {
        path: 'lineItems.conceptId',
        select: '_id',
        populate: {
          path: 'profitCenter',
          select: 'profitCenter',
        },
        lean: true
      }

    }).then((res => {
      return res;
    }));
    
  }

  async findList(query): Promise<any> {

    return this.model.find(query).sort({ 'invoiceVersion': -1 }).limit(1);
  }

  // Todo:Mohsin:Data should be get from findByDate function not with request body

  async exportInvoiceMovements(invoiceData: any) {

    // const data = await this.findByDate(body);

    if (invoiceData.format === 'csv') {
      const dir = './uploads/invoice-moment-data.csv'

      // fields used as csv header

      const fields = [
        '_id', 'autoNumber',
        'billingAddress', 'createAt',
        'createdBy', 'dueDate', 'entity',
        'entityId', 'invoiceDate', 'invoiceId',
        'invoiceStatus', 'invoiceTotals.baseAmount',
        'invoiceTotals.discountAmount', 'invoiceTotals.irpfAmount',
        'invoiceTotals.totalAmount', 'invoiceTotals.vatAmount',
        'invoiceVersion',
        'isRecurring',
        'lineItems.baseAmount',
        'lineItems.conceptId._id',
        'lineItems.conceptId.profitCenter.profitCenter',
        'lineItems.createAt', 'lineItems.description',
        'lineItems.discount', 'lineItems.irpf',
        'lineItems.quantity', 'lineItems.unitPrice',
        'lineItems.updateAt', 'lineItems.vat',
        'lineItems._id', 'number_id',
        'paymentMethodId', 'paymentsDetails.outstandingBalance',
        'paymentsDetails.outstandingPercentage', 'paymentsDetails.totalInvoice',
        'paymentsDetails.', 'paymentsDetails.totalPaid',
        'recurring.emails', 'recurring.endDate',
        'recurring.frequency', 'recurring.startDate',
        'seriesId', 'status',
        'subject', 'type',
        'updateAt', 'updatedBy'
      ];

      const unwind = transforms.unwind({ paths: ['lineItems', 'recurring.emails'] })
      const flatten = transforms.flatten({ arrays: true })


      const json2csvParser = new Parser({ fields, transforms: [unwind, flatten] });

      const csv = json2csvParser.parse(invoiceData.data);

      await fs.writeFile(dir, csv, function (err) {
        if (err) {
          return err;
        }
      });
      return { url: dir }
    }

    // xml conversion

    else if (invoiceData.format === 'xml') {

      const dir = './uploads/invoice-moment-data.xml'
      const body = invoiceData.data
      const feed = await builder.create({ root: { body } }, { encoding: 'utf-8' });
      await fs.writeFile(dir, feed.end({ pretty: true }), function (err) {
        if (err) {
          return err;
        }
      });
      return { url: dir }
    }


  }

}


