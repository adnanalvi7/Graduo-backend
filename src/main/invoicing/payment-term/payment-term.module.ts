import { Module } from '@nestjs/common';
import { PaymentTermController } from './payment-term.controller';
import { PaymentTermService } from './payment-term.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentTermSchema } from './schemas/payment-term.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'PaymentTerm', schema: PaymentTermSchema }])],
  controllers: [PaymentTermController],
  providers: [PaymentTermService]
})
export class PaymentTermModule { }
