import { Document } from 'mongoose';

export interface Cnae extends Document {
    number_id: number,
    value: any;
    createdBy: any;
    updatedBy: any;
}
