import { Document } from 'mongoose';
export interface PaymentModes extends Document {
    key: string;
    description: any;
}
