import { Document } from 'mongoose';

export interface OutgoingMailServer extends Document {
  name: string;
  isDefault: boolean;
  description: string;
  smtpServer: string;
  smtpPort: number;
  userName: string;
  password: string;
  connectionSecurity: string;
}
