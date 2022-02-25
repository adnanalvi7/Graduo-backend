import { baseSchema } from 'src/common/base/base.schema';

export const TicketsCommentsSchema = baseSchema({
    comment: String,
    internal: String,
    modelId: String
}, { collection: 'tickets_comments' });
