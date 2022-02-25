import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsBalanceController } from './transactions-balance.controller';
import { TransactionsBalanceService } from './transactions-balance.service';
import { TransactionsBalanceSchema } from './schemas/transactions-balance.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'TransactionsBalance', schema: TransactionsBalanceSchema }])],
  controllers: [TransactionsBalanceController],   
  providers: [TransactionsBalanceService],
  exports: [TransactionsBalanceService]
})
export class TransactionsBalanceModule {}
