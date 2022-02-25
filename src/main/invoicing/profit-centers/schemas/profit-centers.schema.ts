import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const ProfitCentersSchema = baseSchema({
    key: String,
    description: mongoose.Schema.Types.Mixed,
    profitCenter: String,

}, { collection: 'profit_center' });

