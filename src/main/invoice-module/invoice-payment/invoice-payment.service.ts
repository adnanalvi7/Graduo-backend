import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../../common/base/base.service';
import { InvoicePaymentInterface } from './invoice-payment.interface';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class InvoicePaymentService extends BaseService {

    constructor(
        @InjectModel('InvoicePayment')
        protected readonly model: PaginateModel<InvoicePaymentInterface>,
        protected readonly invoiceService: InvoiceService,

    ) {
        super(model);
    }



    async create(req, dto: any): Promise<any> {

        return super.create(req, dto).then(result => {

            return this.invoiceService.findOne(req, { _id: dto['invoiceId'] }).then(invoiceRes => {

                invoiceRes['paymentsDetails']['totalPaid'] = invoiceRes['paymentsDetails']['totalPaid'] + dto['amount'];
                invoiceRes['paymentsDetails']['outstandingBalance'] = invoiceRes['paymentsDetails']['outstandingBalance'] - dto['amount'];

                const outstandingPercentage = (invoiceRes['paymentsDetails']['outstandingBalance'] * 100) / invoiceRes['paymentsDetails']['totalInvoice'];
                invoiceRes['paymentsDetails']['outstandingPercentage'] = outstandingPercentage;

                if (invoiceRes['paymentsDetails']['totalPaid'] > 0 && invoiceRes['paymentsDetails']['totalPaid'] < invoiceRes['invoiceTotals']['totalAmount']) {
                    invoiceRes['status'] = 'partially paid'
                }
                else if (invoiceRes['paymentsDetails']['totalPaid'] == invoiceRes['invoiceTotals']['totalAmount']) {
                    invoiceRes['status'] = 'paid'
                }
                else {
                    invoiceRes['status'] = 'pending';
                }

                return this.invoiceService.update(req, dto['invoiceId'], invoiceRes).then(() => {

                    return result;

                })

            })
        });

    }

    async delete(req, id: any): Promise<any> {
        // return await this.modelClass.deleteOne({ _id: id });

        return this.findOne(req, { _id: id }).then(paymentRes => {

            return this.invoiceService.findOne(req, { _id: paymentRes['invoiceId'] }).then(invoiceRes => {

                return super.delete(req, id).then(delRes => {

                    invoiceRes['paymentsDetails']['totalPaid'] = invoiceRes['paymentsDetails']['totalPaid'] - paymentRes['amount'];
                    invoiceRes['paymentsDetails']['outstandingBalance'] = invoiceRes['paymentsDetails']['outstandingBalance'] + paymentRes['amount'];

                    const outstandingPercentage = (invoiceRes['paymentsDetails']['outstandingBalance'] * 100) / invoiceRes['paymentsDetails']['totalInvoice'];
                    invoiceRes['paymentsDetails']['outstandingPercentage'] = outstandingPercentage;

                    if (invoiceRes['paymentsDetails']['totalPaid'] > 0 && invoiceRes['paymentsDetails']['totalPaid'] < invoiceRes['invoiceTotals']['totalAmount']) {
                        invoiceRes['status'] = 'partially paid'
                    }
                    else if (invoiceRes['paymentsDetails']['totalPaid'] == invoiceRes['invoiceTotals']['totalAmount']) {
                        invoiceRes['status'] = 'paid'
                    }
                    else {
                        invoiceRes['status'] = 'pending';
                    }

                    return this.invoiceService.update(req, paymentRes['invoiceId'], invoiceRes).then(() => {

                        return delRes;

                    })


                })

            })

        })

    }
    

    // private updateInvoicePaymentDetails(): any {



    // }

}
