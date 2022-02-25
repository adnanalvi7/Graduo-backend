import { Document } from 'mongoose';

export interface ConsultingFirms extends Document {
    number_id: number,
    value: any;
    country: any;
    province: any;
    region: any;
    createdBy: any;
    updatedBy: any;
}
