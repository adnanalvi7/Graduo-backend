import { Document } from 'mongoose';

export interface TransactionsBalance extends Document {
  number_id: number,
  operationId: string;
  balanceId: string;
  userId: any;
  balance: number;
  transactionId: any;
  createdBy: string,
  updatedBy: string,
}
