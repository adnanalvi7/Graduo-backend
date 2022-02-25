import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsController } from './documents.controller';
import { DocumentSchema } from './document.schema';
import { DocumentService } from './document.service';
import { UsersSchema } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { AppConfigurationModule } from '../app-configuration/app-configuration.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Document', schema: DocumentSchema },
      {name: 'Users', schema: UsersSchema }
    ]),
    AppConfigurationModule
  ],
  controllers: [DocumentsController],
  providers: [DocumentService,UsersService],
  exports: [DocumentService],
})
export class DocumentModule { }
