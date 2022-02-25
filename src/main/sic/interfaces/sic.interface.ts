import { Document } from 'mongoose';

export interface Sic extends Document {
    number_id: number,
    value: any;
    createdBy: any;
    updatedBy: any;
}
