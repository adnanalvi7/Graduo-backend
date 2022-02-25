import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsQuotesService } from './transactions-quotes.service';

describe('TransactionsQuotesService', () => {
  let service: TransactionsQuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsQuotesService],
    }).compile();

    service = module.get<TransactionsQuotesService>(TransactionsQuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
