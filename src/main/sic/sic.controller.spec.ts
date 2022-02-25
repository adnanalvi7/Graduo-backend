import { Test, TestingModule } from '@nestjs/testing';
import { SicController } from './sic.controller';

describe('Sic Controller', () => {
  let controller: SicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SicController],
    }).compile();

    controller = module.get<SicController>(SicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
