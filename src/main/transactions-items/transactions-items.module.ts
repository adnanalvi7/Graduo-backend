import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsItemsController } from './transactions-items.controller';
import { TransactionsItemsService } from './transactions-items.service';
import { TransactionsItemsSchema } from './schemas/transactions-items.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'TransactionsItems', schema: TransactionsItemsSchema }])],
  controllers: [TransactionsItemsController],   
  providers: [TransactionsItemsService],
  exports: [TransactionsItemsService]
})
export class TransactionsItemsModule {}
