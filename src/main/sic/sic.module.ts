import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SicController } from './sic.controller';
import { SicService } from './sic.service';
import { SicSchema } from './schemas/sic.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Sic', schema: SicSchema }])],
  controllers: [SicController],   
  providers: [SicService],
  exports: [SicService]
})
export class SicModule {}
