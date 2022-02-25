import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';

describe('Regions Controller', () => {
  let controller: RegionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
    }).compile();

    controller = module.get<RegionsController>(RegionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
