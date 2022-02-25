import { Test, TestingModule } from '@nestjs/testing';
import { PaymentModesController } from './payment-modes.controller';

describe('PaymentModes Controller', () => {
  let controller: PaymentModesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentModesController],
    }).compile();

    controller = module.get<PaymentModesController>(PaymentModesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
