export class TicketsDto {
    number_id:number;
    subject: string;
    type: {
        name: string;
    };
    status: string;
    priority: {
        name: string;
    };
    owner: any; 
    category: string;
    offices: string;
    description: string;
    entity: number;
    createdBy: any;
    updatedBy: any;
}