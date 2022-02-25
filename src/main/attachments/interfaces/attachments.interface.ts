import { Document } from 'mongoose';
export interface Attachments extends Document {
  number_id: number;
  refModel: string;
  modelId: any;
  order: number;
  document: boolean;
  publishStatus: boolean;
  isFolder: boolean;
  folderName: string;
  fileName: string;
  fileMd5Name: string;
  fileType: string;
  tableName: string;
  fileSize: number;
  path: string;
  altDescription: object;
  entity: string;
  createdAt: string;
  updatedAt: string;
  createdBy: any;
  updatedBy: any;
}
