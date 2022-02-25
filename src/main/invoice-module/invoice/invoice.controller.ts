import { Controller, Get, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EmailTemplateService } from 'src/main/email-template/email-template.service';
import { BaseController } from '../../../common/base/base.controller';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController extends BaseController {

  constructor(
    protected readonly service: InvoiceService,
    protected readonly emailTemplateService: EmailTemplateService,


  ) {
    super(service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-pdf/:id')
  async generatePdf(@Request() req, @Response() res, @Param('id') id) {
    const response = await this.service.generatePdf(req, id);
    return res.send(response);

  };

  @UseGuards(JwtAuthGuard)
  @Post('email/:id')
  async sendEmail(@Request() req, @Response() res, @Param('id') id) {
    const response = await this.service.sendEmail(req, res, id);
    return res.send(response);
  }

  // Todo: this.emailTemplateService.findlist it should be in services

  @UseGuards(JwtAuthGuard)
  @Post('reminder-email/:id')
  async sendReminderEmail(@Request() req, @Response() res, @Param('id') id) {
    const response = await this.service.sendReminderEmail(req, id);
    return res.send(response);


  }


  @UseGuards(JwtAuthGuard)
  @Get('get-next-auto-number/:seriesId/:invoiceOrQuote')
  async getNextAutoNumber(@Request() req, @Param('seriesId') seriesId, @Param('invoiceOrQuote') invoiceOrQuote) {
    return await this.service.getNextAutoNumber(req, seriesId, invoiceOrQuote);
  };

  @UseGuards(JwtAuthGuard)
  @Get('generate-invoice/:invoiceId/')
  async generateInvoiceFromQuote(@Request() req, @Param('invoiceId') invoiceId) {
    return await this.service.generateInvoiceFromQuote(req, invoiceId);
  };



}
