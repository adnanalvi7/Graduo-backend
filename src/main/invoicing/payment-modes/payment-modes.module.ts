import { Module } from '@nestjs/common';
import { PaymentModesController } from './payment-modes.controller';
import { PaymentModesService } from './payment-modes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModesSchema } from './schemas/payment-modes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'PaymentModes', schema: PaymentModesSchema }])],
  controllers: [PaymentModesController],
  providers: [PaymentModesService]
})
export class PaymentModesModule { }
