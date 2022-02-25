import { baseSchema } from 'src/common/base/base.schema';

export const TransactionsQuotesSchema = baseSchema({
    quoteName: String,
    quoteFunction: String,
    mbQuote: String,
}, { collection: 'transactions_quotes' });