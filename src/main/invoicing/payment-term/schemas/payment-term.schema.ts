import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const PaymentTermSchema = baseSchema({
    key: String,
    description: mongoose.Schema.Types.Mixed,
}, { collection: 'payment_term' });