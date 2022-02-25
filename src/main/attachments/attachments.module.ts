import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { AttachmentsSchema } from './schemas/attachments.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Attachments', schema: AttachmentsSchema }]),
    MulterModule.register({
      dest: './uploads',
    })
  ],
  controllers: [AttachmentsController],   
  providers: [AttachmentsService],
  exports: [AttachmentsService]
})
export class AttachmentsModule {}
