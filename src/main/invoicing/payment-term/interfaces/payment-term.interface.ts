import { Document } from 'mongoose';
export interface PaymentTerm extends Document {
    key: string;
    description: any;
}
