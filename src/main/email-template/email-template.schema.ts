import { baseSchema } from "src/common/base/base.schema";
import * as mongoose from 'mongoose';

export const EmailTemplateSchema = baseSchema({

  action: String,
  title: String,
  subject: String,
  emailBody: String,
  outGoingMailServerId: {type:mongoose.Types.ObjectId , ref:'OutgoingMailServer'},


}, { collection: 'email-template' });
