import { baseSchema } from './../../../common/base/base.schema';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const EntitySchema = baseSchema({
    entityId: String,
    legalName: String,
    legalFormId: String,
    cnae: String,
    sic: String,
    lat: Number,
    lng: Number,
    mapZoom: Number,
    legalActivityId: String,
    entityType: String,
    companyTaxId: String,
    googleAddress: String,
    country:ObjectId ,
    region: ObjectId,
    province: ObjectId,
    business: ObjectId,
    company: ObjectId,
    telephone: String,
    fax: String,
    gdprId: String,
    upDate: String,
    registrationDate: String,
    policiesId: String,
    Bank1: String,
    AccountHolder1: String,
    Account1: String,
    Clabe1: String,
    Bank2: String,
    AccountHolder2: String,
    Account2: String,
    Clabe2: String,
    subAccount: String,
    commentsText: String,
    active: String,
    email: String,
    accountNumber:Number,
    currency:String,
}, { collection: 'entity' });

EntitySchema.virtual('logo', {
    ref: 'Attachments',
    localField: '_id',
    foreignField: 'modelId',
    justOne: true,
});