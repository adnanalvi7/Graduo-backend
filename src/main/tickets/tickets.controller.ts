import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Req, Request } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController extends BaseController {
    constructor(protected readonly service: TicketsService){
        super(service);
    }
}
