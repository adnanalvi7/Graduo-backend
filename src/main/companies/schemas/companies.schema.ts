import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

const ObjectId = mongoose.Types.ObjectId;

export const CompaniesSchema = baseSchema({
    value: mongoose.Schema.Types.Mixed,
    country: ObjectId,
    province: ObjectId,
    region: ObjectId,
    consultingFirm: ObjectId,
}, { collection: 'companies' });

CompaniesSchema.virtual('countryObj', {
    ref: 'Countries',
    localField: 'country',
    foreignField: '_id',
    justOne: true,
});

CompaniesSchema.virtual('regionObj', {
    ref: 'Regions',
    localField: 'region',
    foreignField: '_id',
    justOne: true,
});

CompaniesSchema.virtual('provinceObj', {
    ref: 'Provinces',
    localField: 'province',
    foreignField: '_id',
    justOne: true,
});

CompaniesSchema.virtual('consultingFirmObj', {
    ref: 'ConsultingFirms',
    localField: 'consultingFirm',
    foreignField: '_id',
    justOne: true,
});