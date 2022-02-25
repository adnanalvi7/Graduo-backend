import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const InvoiceSeriesSchema = baseSchema({
    series: Number,
    description: mongoose.Schema.Types.Mixed,
    isDefault:Boolean

}, { collection: 'invoice_series' });