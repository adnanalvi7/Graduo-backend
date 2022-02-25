import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsQuotesController } from './transactions-quotes.controller';

describe('TransactionsQuotes Controller', () => {
  let controller: TransactionsQuotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsQuotesController],
    }).compile();

    controller = module.get<TransactionsQuotesController>(TransactionsQuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
