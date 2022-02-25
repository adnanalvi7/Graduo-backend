import { Document } from 'mongoose';

export interface InvoiceInterface extends Document {
  invoiceOrQuote: String, // Is record belongs to invoice or quote. As per we are using same table for creating invoices and quotes.
  number_id: number;

  entityId: any,
  billingAddress: string,
  type: string,
  subject: string,
  invoiceDate: Date,
  dueDate: Date,
  paymentMethodId: any,
  status: string,
  invoiceStatus: string,
  isRecurring: boolean,
  relatedInvoiceId: any,

  lineItems: [{
    conceptId: any,
    description: string,
    quantity: number,
    unitPrice: number,
    discount: number,
    irpf: number,
    vat: number,
    baseAmount: number,
  }],

  invoiceTotals: {
    baseAmount: number,
    vatAmount: number,
    irpfAmount: number,
    totalAmount: number,
    discountAmount: number
  },


  recurring: {
    frequency: string,
    startDate: Date,
    endDate: Date,
    emails: any
  },

  paymentsDetails: {
    totalInvoice: number,
    totalPaid: number,
    outstandingBalance: number,
    outstandingPercentage: number
  },

  // payments: [{
  //     date: Date,
  //     amount: number,
  //     paymentMethodId: number,
  // }],

  createdBy: string;
  updatedBy: string;
}
