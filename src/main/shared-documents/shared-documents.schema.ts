import * as mongoose from 'mongoose';
import { baseSchema } from "src/common/base/base.schema";

export const SharedDocumentsSchema = baseSchema({


    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    sharedWith:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    permission: String


}, { collection: 'shared_documents' });

