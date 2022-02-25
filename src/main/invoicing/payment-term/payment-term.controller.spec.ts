import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTermController } from './payment-term.controller';

describe('PaymentTerm Controller', () => {
  let controller: PaymentTermController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTermController],
    }).compile();

    controller = module.get<PaymentTermController>(PaymentTermController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
