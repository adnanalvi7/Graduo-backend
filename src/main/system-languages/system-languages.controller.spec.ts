import { Test, TestingModule } from '@nestjs/testing';
import { SystemLanguagesController } from './system-languages.controller';

describe('SystemLanguages Controller', () => {
  let controller: SystemLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemLanguagesController],
    }).compile();

    controller = module.get<SystemLanguagesController>(SystemLanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
