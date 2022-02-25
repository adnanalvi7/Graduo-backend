import { Document } from 'mongoose';

export interface TicketsComments extends Document {
    comment: string;
    internal: string;
    modelId: any;
}
