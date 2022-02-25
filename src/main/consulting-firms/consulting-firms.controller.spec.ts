import { Test, TestingModule } from '@nestjs/testing';
import { ConsultingFirmsController } from './consulting-firms.controller';

describe('ConsultingFirms Controller', () => {
  let controller: ConsultingFirmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultingFirmsController],
    }).compile();

    controller = module.get<ConsultingFirmsController>(ConsultingFirmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
