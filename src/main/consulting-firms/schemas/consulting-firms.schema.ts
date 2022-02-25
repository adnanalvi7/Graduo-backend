import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

const ObjectId = mongoose.Types.ObjectId;

export const ConsultingFirmsSchema = baseSchema({
    value: mongoose.Schema.Types.Mixed,
    country: ObjectId,
    province: ObjectId,
    region: ObjectId,
}, { collection: 'consulting_firms' });
ConsultingFirmsSchema.virtual('countryObj', {
    ref: 'Countries',
    localField: 'country',
    foreignField: '_id',
    justOne: true,
});

ConsultingFirmsSchema.virtual('regionObj', {
    ref: 'Regions',
    localField: 'region',
    foreignField: '_id',
    justOne: true,
});

ConsultingFirmsSchema.virtual('provinceObj', {
    ref: 'Provinces',
    localField: 'province',
    foreignField: '_id',
    justOne: true,
});