import { baseSchema } from 'src/common/base/base.schema';

export const SystemMenusSchema = baseSchema({
    title: String,
    translate: String,
    type: String,
    icon: String,
    url: String,
    order: Number,
    children: Array,
    accessRoles: Array,
    entity: String
}, { collection: 'system_menu' });
