import { baseSchema } from "src/common/base/base.schema";

export const InvoiceSchema = baseSchema({
    clientId: String,
    billingAddress: String,
    type: String,
    subject: String,
    invoiceDate: Date,
    dueDate: Date,
    paymentMode: Number,
    status: String,
    isRecurring: Boolean,

    recurring: {
        frequency: String,
        startDate: Date,
        endDate: Date,
        autoEmails: String
    },

    lineItems: [{
        conceptId: String, // Relation InvoiceConcept
        description: String,
        quantity: Number,
        unitPrice: Number,
        discount: Number,
        irpf: Number,
        vat: Number,
        baseAmount: Number,
    }],

    paymentsDetails: {
        totalInvoice: Number,
        totalPaid: Number,
        outstandingBalance: Number,
        outstandingPercentage: Number,
        dueDate: String,
        daysOverDue: Number,
    },

    payments: [{
        date: Date,
        amount: Number,
        paymentMode: Number,
    }],

    // userId: Number,
    // clients: Number,
    // relatedInvoice: Number,
    // recurringVal: String,
    // userId: Number,
    // relatedTo: [{
    //     types: String,
    //     description: String,
    // }],

}, { collection: 'invoices' });

InvoiceSchema.virtual('client', {
    ref: 'Entity',
    localField: 'clientId',
    foreignField: '_id',
    justOne: true,
});
InvoiceSchema.virtual('conceptsData', {
    ref: 'InvoiceConcepts',
    localField: 'invoiceConcepts.conceptId',
    foreignField: '_id',
    justOne: false,
});
