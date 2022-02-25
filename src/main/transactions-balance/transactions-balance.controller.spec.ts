import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsBalanceController } from './transactions-balance.controller';

describe('TransactionsBalance Controller', () => {
  let controller: TransactionsBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsBalanceController],
    }).compile();

    controller = module.get<TransactionsBalanceController>(TransactionsBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
