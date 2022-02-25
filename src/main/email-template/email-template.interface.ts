import { Document } from 'mongoose';

export interface EmailTemplateInterface extends Document {

  number_id: number;
  type: string;
  title: string;
  subject: string;
  emailBody: string;
  outGoingMailServerId: any;
}
