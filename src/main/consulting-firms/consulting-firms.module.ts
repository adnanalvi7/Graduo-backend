import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultingFirmsController } from './consulting-firms.controller';
import { ConsultingFirmsService } from './consulting-firms.service';
import { ConsultingFirmsSchema } from './schemas/consulting-firms.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'ConsultingFirms', schema: ConsultingFirmsSchema }])],
  controllers: [ConsultingFirmsController],   
  providers: [ConsultingFirmsService],
  exports: [ConsultingFirmsService]
})
export class ConsultingFirmsModule {}
