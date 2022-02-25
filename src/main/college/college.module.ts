import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { CollegeSchema } from './schemas/college.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'College', schema: CollegeSchema }])],
  controllers: [CollegeController],   
  providers: [CollegeService],
  exports: [CollegeService]
})
export class CollegeModule {}
