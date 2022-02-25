import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountriesSchema } from './schemas/countries.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Countries', schema: CountriesSchema }])],
  controllers: [CountriesController],   
  providers: [CountriesService],
  exports: [CountriesService]
})
export class CountriesModule {}
