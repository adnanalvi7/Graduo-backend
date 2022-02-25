import { Test, TestingModule } from '@nestjs/testing';
import { ProfitCentersController } from './profit-centers.controller';

describe('ProfitCenters Controller', () => {
  let controller: ProfitCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfitCentersController],
    }).compile();

    controller = module.get<ProfitCentersController>(ProfitCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
