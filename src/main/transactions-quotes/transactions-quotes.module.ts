import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsQuotesController } from './transactions-quotes.controller';
import { TransactionsQuotesService } from './transactions-quotes.service';
import { TransactionsQuotesSchema } from './schemas/transactions-quotes.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'TransactionsQuotes', schema: TransactionsQuotesSchema }])],
  controllers: [TransactionsQuotesController],   
  providers: [TransactionsQuotesService],
  exports: [TransactionsQuotesService]
})
export class TransactionsQuotesModule {}
