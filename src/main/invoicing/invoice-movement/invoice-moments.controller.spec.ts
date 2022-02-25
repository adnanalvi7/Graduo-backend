import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceMovementsController } from './invoice-movement.controller';

describe('InvoiceMovements Controller', () => {
  let controller: InvoiceMovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceMovementsController],
    }).compile();

    controller = module.get<InvoiceMovementsController>(InvoiceMovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
