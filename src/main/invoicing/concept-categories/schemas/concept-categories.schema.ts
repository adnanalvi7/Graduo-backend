import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const ConceptCategoriesSchema = baseSchema({
    code: Number,
    description: mongoose.Schema.Types.Mixed,

}, { collection: 'concept_categories' });


