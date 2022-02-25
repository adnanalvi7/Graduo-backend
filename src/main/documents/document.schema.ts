import * as mongoose from 'mongoose';
import { baseSchema } from "src/common/base/base.schema";

export const DocumentSchema = baseSchema({

    isFolder: Boolean,

    parentFolderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },

    name: String,
    filename: String,
    mimeType: String, // image/jpeg

    metaData: mongoose.Schema.Types.Mixed,
    sizeInBytes: Number,
    sizeInKBs: Number, 
    sizeInMBs: Number, 

}, { collection: 'documents' });

