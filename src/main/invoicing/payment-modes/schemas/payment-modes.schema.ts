import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const PaymentModesSchema = baseSchema({

    key: String,
    description: mongoose.Schema.Types.Mixed,

}, { collection: 'payment_modes' });