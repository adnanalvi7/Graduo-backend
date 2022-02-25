import { Document } from 'mongoose';

export interface Countries extends Document {
    number_id: Number,
    value: any;
    createdBy: any;
    updatedBy: any;
}
