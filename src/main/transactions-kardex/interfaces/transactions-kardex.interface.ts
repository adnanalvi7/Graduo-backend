import { Document } from 'mongoose';

export interface TransactionsKardex extends Document {
  number_id: number,
  kardexId: string;
  transactionId: any;
  type: string;
  total: number;
  datetime: Date;
  userId: any;
  hostIp: string;
  entity: number;
  createdBy: string;
  updatedBy: string;
}
