import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DepartmentsSchema } from './schemas/departments.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Departments', schema: DepartmentsSchema }])],
  controllers: [DepartmentsController],   
  providers: [DepartmentsService],
  exports: [DepartmentsService]
})
export class DepartmentsModule {}
