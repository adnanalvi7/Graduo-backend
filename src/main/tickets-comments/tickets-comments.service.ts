import { BaseService } from '../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TicketsComments } from './interfaces/tickets-comments.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class TicketsCommentsService extends BaseService {
    constructor(@InjectModel('Tickets-Comments') protected readonly model: PaginateModel<TicketsComments>) {
        super(model);
    }
}
