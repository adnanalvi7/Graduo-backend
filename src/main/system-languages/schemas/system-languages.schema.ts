import { baseSchema } from 'src/common/base/base.schema';

export const SystemLanguagesSchema = baseSchema({
    language: String,
    code: String,
    status: String,
    order: Number,
}, { collection: 'system_languages' });