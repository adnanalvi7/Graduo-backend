import { Document } from 'mongoose';

export interface InvoiceInterface extends Document {

    number_id: number;
    clients: string;
    userId: number;
    billingAddress: string;
    type: string;
    relatedinvoice: string;
    subject: string;
    invoiceDate: Date;
    dueDate: Date;
    status: string;
    relatedTo: [{
        types: string;
        description: string;

    }];
    invoiceConcepts: [{
        concept: number;
        description: string;
        quantity: number;
        unitPrice: number;
        discount: number;
        irpf: number;
        vat: number;
        baseAmount: number;
    }];
    paymentMode: string;
    recurring: {
        frequency: string,
        startDate: Date,
        lastDate: Date,
        autoEmailInvoice: string
    };
    paymentCalculation: PaymentCalculationInterface;
    paymentReceive: [PaymentReceiveInterface];
    createdBy: string;
    updatedBy: string;
}

export interface PaymentCalculationInterface {
    totalInvoice: number;
    totalPaid: number | string;
    outstandingBalance: number | string;
    outstandingPercentage: number | string;
    dueDate: string;
    daysOverDue: number | string;
}

export interface PaymentReceiveInterface {
    amount: number;
    paymentMode: number | string;
    date: Date | string;
}