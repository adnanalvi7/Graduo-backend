import { Document } from 'mongoose';

export interface WildDuck extends Document {
    value: any;
    createdBy: any;
    updatedBy: any;
}
