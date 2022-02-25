import { Module } from '@nestjs/common';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateSchema } from './email-template.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'EmailTemplate', schema: EmailTemplateSchema },]),
  ],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule { }
