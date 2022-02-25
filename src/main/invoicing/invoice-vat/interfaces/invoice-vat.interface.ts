import { Document } from 'mongoose';
export interface InvoiceVat extends Document {
    key: string;
    percentage: number;
    description: any;
}


