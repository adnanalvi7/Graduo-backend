import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const InvoiceVatSchema = baseSchema({
    percentage: Number,
    description: mongoose.Schema.Types.Mixed,
}, { collection: 'invoice_vat' });