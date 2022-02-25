import { Module } from '@nestjs/common';
import { InvoiceVatService } from './invoice-vat.service';
import { InvoiceVatController } from './invoice-vat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceVatSchema } from './schemas/invoice-vat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'InvoiceVat', schema: InvoiceVatSchema }])],
  providers: [InvoiceVatService],
  controllers: [InvoiceVatController]
})
export class InvoiceVatModule { }
