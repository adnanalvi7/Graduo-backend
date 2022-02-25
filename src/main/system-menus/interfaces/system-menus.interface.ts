import { Document } from 'mongoose';

export interface SystemMenus extends Document {
    number_id: number,
    title: string;
    translate: string;
    type: string;
    icon: string;
    url: string;
    order: number;
    children: [any];
    accessRoles: [any];
    entity: string;
    createdBy: any;
    updatedBy: any;
}
