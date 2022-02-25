export class SystemMenusDto {
    number_id: number;
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