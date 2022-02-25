import { Document } from 'mongoose';

export interface Request extends Document {

  description: string,
  entity: any,
  type: string,
  subAccount: string,
  comments: string,

}
