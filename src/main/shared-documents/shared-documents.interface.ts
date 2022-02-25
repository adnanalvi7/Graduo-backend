import { Document } from 'mongoose';

export interface SharedDocumentsInterface extends Document {

  number_id: number;

  ownerId: any,
  documentId: string, // file or folder
  permission: string,
  sharedWith: any,
  createdBy: string;
  updatedBy: string;
}
