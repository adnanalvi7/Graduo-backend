import { Document } from 'mongoose';

export interface AppConfiguration extends Document {

  key: string;
  title: string;
  value: string;
}
