import { Document } from 'mongoose';

export interface College extends Document {
    number_id: number,
    value: any;
    createdBy: any;
    updatedBy: any;
}
