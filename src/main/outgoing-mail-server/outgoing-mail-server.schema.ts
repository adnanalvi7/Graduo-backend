import { baseSchema } from "src/common/base/base.schema";

export const OutgoingMailServerSchema = baseSchema({
  name: String,
  isDefault: Boolean,
  description: String,
  smtpServer: String,
  smtpPort: Number,
  userName: String,
  password: String,
  connectionSecurity: String,

}, { collection: 'out_going_mail_servers' });

