import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';
import { ProvincesSchema } from './schemas/provinces.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Provinces', schema: ProvincesSchema }])],
  controllers: [ProvincesController],   
  providers: [ProvincesService],
  exports: [ProvincesService]
})
export class ProvincesModule {}
