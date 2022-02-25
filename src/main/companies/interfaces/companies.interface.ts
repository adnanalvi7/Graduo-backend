import { Document } from 'mongoose';

export interface Companies extends Document {
    number_id: number;
    value: any;
    country: any;
    province: any;
    region: any;
    business: any;
    createdBy: any;
    updatedBy: any;
}
