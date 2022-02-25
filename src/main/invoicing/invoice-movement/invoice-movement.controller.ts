

import { Controller, Request, Post, Response, Body } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { InvoiceMovementsService } from './invoice-movement.service';


@Controller('invoice-movements')
export class InvoiceMovementsController extends BaseController {
  constructor(protected readonly service: InvoiceMovementsService) {
    super(service);
  }
  @Post('list')
  async findlist(@Response() res, @Request() req){
    return this.service.findByDate(req.body.query).then((result)=>{
       return res.send(result);
    })
  }
  
  @Post('export')
  async exportInvoiceMovements(@Response() res, @Request() req, @Body() body) {
    const response = await this.service.exportInvoiceMovements(body);
    return res.send(response);

  };
}


