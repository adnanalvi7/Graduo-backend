import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

const ObjectId = mongoose.Types.ObjectId;

export const ProvincesSchema = baseSchema({
    value: mongoose.Schema.Types.Mixed,
    country: ObjectId,
    region: ObjectId,
}, { collection: 'provinces' });

ProvincesSchema.virtual('countryObj', {
    ref: 'Countries',
    localField: 'country',
    foreignField: '_id',
    justOne: true,
});

ProvincesSchema.virtual('regionObj', {
    ref: 'Regions',
    localField: 'region',
    foreignField: '_id',
    justOne: true,
});