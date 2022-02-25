import { baseSchema } from 'src/common/base/base.schema';

export const AppConfigurationSchema = baseSchema({
  key: String,
  title: String,
  value: String,

}, { collection: 'app_configurations' });
