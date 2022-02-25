import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceVatController } from './invoice-vat.controller';

describe('InvoiceVat Controller', () => {
  let controller: InvoiceVatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceVatController],
    }).compile();

    controller = module.get<InvoiceVatController>(InvoiceVatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
