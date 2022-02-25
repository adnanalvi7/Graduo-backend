import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { TicketsCommentsService } from './tickets-comments.service';

@Controller('tickets-comments')
export class TicketsCommentsController extends BaseController {
    constructor(protected readonly service: TicketsCommentsService){
        super(service);
    }
}
