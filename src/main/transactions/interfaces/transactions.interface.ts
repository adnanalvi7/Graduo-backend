import { Document } from 'mongoose';

export interface Transactions extends Document {
  number_id: number;
  description: string;
  applicantId: string;
  applicant: string;
  grantsId: string;
  grants: string;
  type: string;
  transInitDate: Date;
  transResolveDate: Date;
  transEndDate: Date;
  tax: number;
  total: number;
  payMode: string;
  bankId: string;
  amount: number;
  bankTransaction: string;
  authorizedDatetime: Date;
  authorizedNumber: number;
  comments: string;
  entity: number;
  createdBy: any;
  updatedBy: any;
}
