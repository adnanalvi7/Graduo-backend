import * as mongoose from 'mongoose';
import { baseSchema } from 'src/common/base/base.schema';

export const TicketsSchema = baseSchema({
    number_id: Number,
    subject: String,
    type:  {
        name:String,
    },
    status: String,
    priority: {
        name: String,
    },
    category: String,
    description: String,
}, { collection: 'tickets' });

TicketsSchema.virtual('user', {
    ref: 'Users',
    localField: 'createdBy',
    foreignField: '_id',
    justOne: true,
});