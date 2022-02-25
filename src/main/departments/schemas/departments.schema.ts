import { baseSchema } from 'src/common/base/base.schema';

export const DepartmentsSchema = baseSchema({
    name: String,
    area: String,
    expenseAccount: String,
    subAccount: String,
    comments: String,
}, { collection: 'departments' });