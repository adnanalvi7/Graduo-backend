import * as mongoose from 'mongoose';
import { baseSchema } from "src/common/base/base.schema";

export const InvoiceMovementsSchema = baseSchema({
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceSeries' },
    autoNumber: Number, // Auto generated number, must be unique in invoices or quotes.
    // entityId: mongoose.Schema.Types.ObjectId, // Relation with Entity Table
    // relatedInvoiceId: mongoose.Schema.Types.ObjectId, // Self relation
    // paymentMethodId: mongoose.Schema.Types.ObjectId, // Relation with PaymentMethod/PaymentMode
    entityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' },
    relatedInvoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }, // invoice relation
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMode' }, // Relation with PaymentMethod/PaymentMode
    billingAddress: String,
    type: String,
    subject: String,
    invoiceDate: Date,
    dueDate: Date,
    status: String,
    // Field for invoice status
    invoiceStatus: String,
    isRecurring: Boolean,
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }, // invoice relation
    invoiceVersion: Number,

    lineItems: [{
        // conceptId: mongoose.Schema.Types.ObjectId, // InvoiceConcept
        conceptId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceConcepts' }, // InvoiceConcept
        description: String,
        quantity: Number,
        unitPrice: Number,
        discount: Number,
        irpf: Number,
        vat: Number,
        baseAmount: Number,
    }],

    invoiceTotals: {
        baseAmount: Number,
        vatAmount: Number,
        irpfAmount: Number,
        totalAmount: Number,
        discountAmount: Number
    },

    recurring: {
        frequency: String,
        startDate: Date,
        endDate: Date,
        emails: Array
    },

    paymentsDetails: {
        totalInvoice: Number,
        totalPaid: Number,
        outstandingBalance: Number,
        outstandingPercentage: Number,
    },

}, { collection: 'invoice_movements' });

InvoiceMovementsSchema.virtual('entityData', {
    ref: 'Entity',
    localField: 'office',
    foreignField: '_id',
    justOne: true,
});
