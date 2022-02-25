import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './schemas/request.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }])],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule { }
