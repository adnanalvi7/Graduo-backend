import { baseSchema } from 'src/common/base/base.schema';

export const SystemTranslationsSchema = baseSchema({
    language: {
        type: String,
        index:true
    },
    key: {
        type: String,
        index:true
    },
    value: String,
    status: String,
}, { collection: 'system_translations' });
SystemTranslationsSchema.index({ language: 1, key: 1 }, { unique: true });
