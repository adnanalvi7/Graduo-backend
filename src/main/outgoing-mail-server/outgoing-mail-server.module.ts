import { Module } from '@nestjs/common';
import { OutgoingMailServerController } from './outgoing-mail-server.controller';
import { OutgoingMailServerService } from './outgoing-mail-server.service';
import { OutgoingMailServerSchema } from './outgoing-mail-server.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OutgoingMailServer', schema: OutgoingMailServerSchema },
    ]),
  ],
  controllers: [OutgoingMailServerController],
  providers: [OutgoingMailServerService],
  exports: [OutgoingMailServerService],
})
export class OutgoingMailServerModule { }
