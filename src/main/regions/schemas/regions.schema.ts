import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

const ObjectId = mongoose.Types.ObjectId;

export const RegionsSchema = baseSchema({
    
    value: mongoose.Schema.Types.Mixed,
    country: ObjectId,

}, { collection: 'regions' });

RegionsSchema.virtual('countryObj', {
    ref: 'Countries',
    localField: 'country',
    foreignField: '_id',
    justOne: true,
});