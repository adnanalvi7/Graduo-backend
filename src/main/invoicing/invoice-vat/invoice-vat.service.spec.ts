import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceVatService } from './invoice-vat.service';

describe('InvoiceVatService', () => {
  let service: InvoiceVatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceVatService],
    }).compile();

    service = module.get<InvoiceVatService>(InvoiceVatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
