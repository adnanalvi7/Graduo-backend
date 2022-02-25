import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { activitiesSchema } from './schemas/activities.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Activities', schema: activitiesSchema }])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService]
})
export class ActivitiesModule { }
