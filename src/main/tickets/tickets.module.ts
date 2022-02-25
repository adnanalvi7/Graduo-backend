import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketsSchema } from './schemas/tickets.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Tickets', schema: TicketsSchema }])],
  controllers: [TicketsController],   
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
