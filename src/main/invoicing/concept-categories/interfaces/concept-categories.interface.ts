import { Document } from 'mongoose';
export interface ConceptCategories extends Document {
    key: string;
    code: string;
    description: any;
}
