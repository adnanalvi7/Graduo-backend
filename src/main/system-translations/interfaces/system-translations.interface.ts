import { Document } from 'mongoose';

export interface SystemTranslations extends Document {
    number_id:number;
    language: string;
    key: string;
    value: any;
    status: string;
    agency: string;
    entity: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}
