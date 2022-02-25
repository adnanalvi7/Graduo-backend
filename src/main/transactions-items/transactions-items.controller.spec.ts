import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsItemsController } from './transactions-items.controller';

describe('TransactionsItems Controller', () => {
  let controller: TransactionsItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsItemsController],
    }).compile();

    controller = module.get<TransactionsItemsController>(TransactionsItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
