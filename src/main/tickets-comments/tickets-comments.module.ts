import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsCommentsController } from './tickets-comments.controller';
import { TicketsCommentsService } from './tickets-comments.service';
import { TicketsCommentsSchema } from './schemas/tickets-comments.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Tickets-Comments', schema: TicketsCommentsSchema }])],
  controllers: [TicketsCommentsController],   
  providers: [TicketsCommentsService],
  exports: [TicketsCommentsService]
})
export class TicketsCommentsModule {}
