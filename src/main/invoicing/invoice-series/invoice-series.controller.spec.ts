import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceSeriesController } from './invoice-series.controller';

describe('InvoiceSeries Controller', () => {
  let controller: InvoiceSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceSeriesController],
    }).compile();

    controller = module.get<InvoiceSeriesController>(InvoiceSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
