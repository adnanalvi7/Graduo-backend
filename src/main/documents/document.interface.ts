import { Document } from 'mongoose';

export interface DocumentInterface extends Document {

  number_id: number;

  ownerId: any,
  type: string, // file or folder
  originalName: string,
  metaData: any,
  fileSizeMB: number,
  createdBy: string;
  updatedBy: string;

}
