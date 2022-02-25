import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesSchema } from './schemas/companies.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Companies', schema: CompaniesSchema }])],
  controllers: [CompaniesController],   
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
