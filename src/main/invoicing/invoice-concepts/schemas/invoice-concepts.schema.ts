import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const InvoiceConceptsSchema = baseSchema({
  key: Number,
  description: mongoose.Schema.Types.Mixed,
  defaultQuantity: Number,
  defaultValue: Number,
  conceptCategory: mongoose.Schema.Types.ObjectId,
  defaultVAT: mongoose.Schema.Types.ObjectId,
  profitCenter:  { type: mongoose.Schema.Types.ObjectId, ref: 'ProfitCenters' },

}, { collection: 'invoice_concepts' });

InvoiceConceptsSchema.virtual('CategoriesData', {
  ref: 'ConceptCategories',
  localField: 'conceptCategory',
  foreignField: '_id',
  justOne: true,
});
InvoiceConceptsSchema.virtual('DefaultVATData', {
  ref: 'InvoiceVat',
  localField: 'defaultVAT',
  foreignField: '_id',
  justOne: true,
});

InvoiceConceptsSchema.virtual('ProfitCentersData', {
  ref: 'ProfitCenters',
  localField: 'profitCenter',
  foreignField: '_id',
  justOne: true,
});
