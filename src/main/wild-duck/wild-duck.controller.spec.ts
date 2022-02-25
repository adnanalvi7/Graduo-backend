import { Test, TestingModule } from '@nestjs/testing';
import { WildDuckController } from './wild-duck.controller';

describe('WildDuck Controller', () => {
  let controller: WildDuckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WildDuckController],
    }).compile();

    controller = module.get<WildDuckController>(WildDuckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
