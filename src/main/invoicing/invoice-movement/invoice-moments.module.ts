import { Module } from '@nestjs/common';
import { InvoiceMovementsController } from './invoice-movement.controller';
import { InvoiceMovementsService } from './invoice-movement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceMovementsSchema } from './schemas/invoice-movement.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'InvoiceMovement', schema: InvoiceMovementsSchema }])],
  controllers: [InvoiceMovementsController],
  providers: [InvoiceMovementsService],
  exports: [InvoiceMovementsService],
})
export class InvoiceMovementsModule { }
