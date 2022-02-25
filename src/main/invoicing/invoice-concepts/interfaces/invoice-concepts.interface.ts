import { Document } from 'mongoose';
export interface InvoiceConcepts extends Document {
    key: number,
    description: any;
    defaultQuantity: number;
    defaultValue: number;
    conceptCategory: number;
    defaultVAT: number;
    profitCenter: number;
}
