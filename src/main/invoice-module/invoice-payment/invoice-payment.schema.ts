import * as mongoose from 'mongoose';
import { baseSchema } from "src/common/base/base.schema";

export const InvoicePaymentSchema = baseSchema({
    invoiceId: mongoose.Schema.Types.ObjectId, // Relation with Invoice
    date: String,
    amount: Number,
    paymentMethodId: mongoose.Schema.Types.ObjectId

}, { collection: 'invoice-payments' });

InvoicePaymentSchema.virtual('invoice', { ref: 'Invoice', localField: 'invoiceId', foreignField: '_id', justOne: true, });
InvoicePaymentSchema.virtual('paymentMethod', { ref: 'PaymentModes', localField: 'paymentMethodId', foreignField: '_id', justOne: true, });
