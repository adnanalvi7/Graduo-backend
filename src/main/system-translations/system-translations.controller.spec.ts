import { Test, TestingModule } from '@nestjs/testing';
import { SystemTranslationsController } from './system-translations.controller';

describe('SystemTranslations Controller', () => {
  let controller: SystemTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemTranslationsController],
    }).compile();

    controller = module.get<SystemTranslationsController>(SystemTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
