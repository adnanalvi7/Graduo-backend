import { Document } from 'mongoose';
export interface ProfitCenters extends Document {
    key: string;
    description: any;
    profitCenter: string;
}
