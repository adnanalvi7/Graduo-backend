import { Document } from 'mongoose';

export interface Departments extends Document {
    number_id: number,
    name: string;
    area: string;
    expenseAccount: string;
    subAccount: string;
    comments: string;
    entity: number;
    createdBy: any;
    updatedBy: any;
}
