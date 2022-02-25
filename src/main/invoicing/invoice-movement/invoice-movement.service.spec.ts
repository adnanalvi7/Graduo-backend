import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceMovementsService } from './invoice-movement.service';

describe('InvoiceMomentsService', () => {
  let service: InvoiceMovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceMovementsService],
    }).compile();

    service = module.get<InvoiceMovementsService>(InvoiceMovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
