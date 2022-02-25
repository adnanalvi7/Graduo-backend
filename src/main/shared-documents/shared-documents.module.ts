import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedDocumentsController } from './shared-documents.controller';
import { SharedDocumentsSchema } from './shared-documents.schema';
import { SharedDocumentsService } from './shared-documents.service';
import { DocumentSchema } from '../documents/document.schema';
import { DocumentService } from '../documents/document.service';
import { DocumentModule } from '../documents/document.module';
import { UsersModule } from '../users/users.module';
import { UsersSchema } from '../users/schemas/users.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SharedDocuments', schema: SharedDocumentsSchema },
    { name: 'Document', schema: DocumentSchema },
    {name: 'Users', schema: UsersSchema }

    ]),
    UsersModule
  ],
  controllers: [SharedDocumentsController],
  providers: [SharedDocumentsService,DocumentService],
  exports: [SharedDocumentsService],
})
export class SharedDocumentsModule { }
