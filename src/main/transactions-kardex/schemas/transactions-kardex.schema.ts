import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const TransactionsKardexSchema = new mongoose.Schema({
}, { collection: 'histories' });


TransactionsKardexSchema.pre('find', function (next) {
    if (this.getQuery().collectionId && typeof this.getQuery().collectionId === 'string') {
        this.where({ collectionId: ObjectId(this.getQuery().collectionId) });
    }
    next();
});