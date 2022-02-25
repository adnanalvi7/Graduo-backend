import { Module } from '@nestjs/common';
import { InvoiceConceptsController } from './invoice-concepts.controller';
import { InvoiceConceptsService } from './invoice-concepts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceConceptsSchema } from './schemas/invoice-concepts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'InvoiceConcepts', schema: InvoiceConceptsSchema }])],
  controllers: [InvoiceConceptsController],
  providers: [InvoiceConceptsService]
})
export class InvoiceConceptsModule { }
