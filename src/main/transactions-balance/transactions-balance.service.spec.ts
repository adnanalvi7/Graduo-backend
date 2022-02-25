import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsBalanceService } from './transactions-balance.service';

describe('TransactionsBalanceService', () => {
  let service: TransactionsBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsBalanceService],
    }).compile();

    service = module.get<TransactionsBalanceService>(TransactionsBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
