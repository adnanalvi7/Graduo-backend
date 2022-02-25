import * as mongoose from 'mongoose';
import { baseSchema } from "src/common/base/base.schema";

export const InvoiceSchema = baseSchema({
    // Holds value 'invoice' or 'quote'. 
    // To check if record belongs to invoice or quote. As per we are using same table for creating invoices and quotes.
    invoiceOrQuote: String, 
    
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceSeries' },
    autoNumber: Number, // Auto generated number, must be unique in invoices or quotes.
  
    entityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' },
    relatedInvoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }, // Self relation
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMode' }, // Relation with PaymentMethod/PaymentMode

    billingAddress: String,
    type: String,
    subject: String,
    invoiceDate: Date,
    dueDate: Date,
    // Field used for payment status
    status: String,
    // Field for invoice status
    invoiceStatus: String,
    isRecurring: Boolean,
    quoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },

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

}, { collection: 'invoices' });

// InvoiceSchema.virtual('invoiceEntity', { ref: 'Entity', localField: 'entityId', foreignField: '_id', justOne: true, });
// InvoiceSchema.virtual('invoice', { ref: 'Invoice', localField: 'relatedInvoiceId', foreignField: '_id', justOne: true, });
// InvoiceSchema.virtual('paymentMethod', { ref: 'PaymentModes', localField: 'paymentMethodId', foreignField: '_id', justOne: true, });
// InvoiceSchema.virtual('relatedInvoice', { ref: 'Invoice', localField: 'relatedInvoiceId', foreignField: '_id', justOne: true, });
// InvoiceSchema.virtual('concept', { ref: 'InvoiceConcepts', localField: 'lineItems.conceptId', foreignField: '_id', justOne: false, });
