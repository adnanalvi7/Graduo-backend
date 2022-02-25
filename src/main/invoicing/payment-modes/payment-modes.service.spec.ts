import { Test, TestingModule } from '@nestjs/testing';
import { PaymentModesService } from './payment-modes.service';

describe('PaymentModesService', () => {
  let service: PaymentModesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentModesService],
    }).compile();

    service = module.get<PaymentModesService>(PaymentModesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
