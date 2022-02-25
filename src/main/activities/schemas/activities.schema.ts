import * as mongoose from 'mongoose';
import { baseSchema } from './../../../common/base/base.schema';

const String = mongoose.Schema.Types.String;
export const activitiesSchema = baseSchema({

  title: String,
  priority: String,
  status: String,
  start: Date,
  startTime: String,
  end: Date,
  endTime: String,
  notification: String,
  notificationTime: Number,
  timeUnits: String,
  repeatType: String,
  activitiesCategory: String,
  from: String,
  assignTo: String,
  relatedTo: String,
  description: String,
  office: String,
  contact: String,

  remainderTime: String,
  googleMap: String,
  countries: String,
  activeRegion: String,
  province: String,
  city: String,
  postalCode: String,
  street: String,
  streetNumber: String,
  comments: String,
  descriptionMeeting: String,
  meetingType: String,
  participants: String,
  participantsEmail: String,
  color:mongoose.Schema.Types.Mixed


}, { collection: 'activities' });


activitiesSchema.virtual('clientData', {
  ref: 'Entity',
  localField: 'assignTo',
  foreignField: 'number_id',
  justOne: true,
});
