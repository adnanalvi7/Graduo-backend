import { Module } from '@nestjs/common';
import { InvoiceSeriesService } from './invoiceseries.service';
import { InvoiceSeriesController } from './invoice-series.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSeriesSchema } from './schemas/invoice-series.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'InvoiceSeries', schema: InvoiceSeriesSchema }])],
  providers: [InvoiceSeriesService],
  controllers: [InvoiceSeriesController]
})
export class InvoiceSeriesModule { }
