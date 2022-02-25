import { Document } from 'mongoose';

export interface UsersRoles extends Document {
    number_id: number,
    name: string;
    createdBy: any;
    updatedBy: any;
}
