import { Document } from 'mongoose';

export interface TransactionsQuotes extends Document {
    number_id: number
    quoteName: string;
    quoteFunction: string;
    mbQuote: string;
    entity: number;
    createdBy: any;
    updatedBy: any;
}
