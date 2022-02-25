import { baseSchema } from 'src/common/base/base.schema';

export const TransactionsItemsSchema = baseSchema({
    operationId: String,
    type: String,
    entity: Number,
    transactionId: String,
    serviceId: String,
    itemId: String,
    qty: String,
    price: String,
    taxes: String,
    discount: String,
    total: String
}, { collection: 'transactions_items' });
