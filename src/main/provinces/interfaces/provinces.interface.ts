import { Document } from 'mongoose';

export interface Provinces extends Document {
    number_id: number;
    value: any;
    country: number;
    region: number;
    createdBy: any;
    updatedBy: any;
}
