import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsKardexController } from './transactions-kardex.controller';
import { TransactionsKardexService } from './transactions-kardex.service';
import { TransactionsKardexSchema } from './schemas/transactions-kardex.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'TransactionsKardex', schema: TransactionsKardexSchema }])],
  controllers: [TransactionsKardexController],
  providers: [TransactionsKardexService],
  exports: [TransactionsKardexService]
})
export class TransactionsKardexModule { }
