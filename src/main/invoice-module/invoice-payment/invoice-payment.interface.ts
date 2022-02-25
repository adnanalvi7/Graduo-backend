import { Document } from 'mongoose';

export interface InvoicePaymentInterface extends Document {

    number_id: number;

    invoiceId: any, // Relation with Invoice
    date: Date,
    amount: number,
    paymentMethodId: any

    createdBy: string;
    updatedBy: string;
}