import { Document } from 'mongoose';

export interface SystemLanguages extends Document {
    number_id: number;
    language: string;
    code: string;
    status: string;
    order: number;
    entity: number;
    createdBy: any;
    updatedBy: any;
    ip: string;
}
