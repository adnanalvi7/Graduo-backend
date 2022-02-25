import { Document } from 'mongoose';
export interface InvoiceSeries extends Document {
    key: string;
    series: string;
    description: any;
    isDefault: boolean;
}
