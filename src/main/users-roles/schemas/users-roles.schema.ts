import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const UsersRolesSchema = baseSchema({
    name: mongoose.Schema.Types.Mixed,
    isSuperUser: Boolean
}, { collection: 'user_roles' });