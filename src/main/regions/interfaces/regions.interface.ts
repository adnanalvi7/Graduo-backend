import { Document } from 'mongoose';

export interface Regions extends Document {
    number_id: number,
    value: any;
    country: number;
    createdBy: any; 
    updatedBy: any; 
}
