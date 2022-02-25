import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsItemsService } from './transactions-items.service';

describe('TransactionsItemsService', () => {
  let service: TransactionsItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsItemsService],
    }).compile();

    service = module.get<TransactionsItemsService>(TransactionsItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
