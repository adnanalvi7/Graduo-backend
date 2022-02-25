import { Test, TestingModule } from '@nestjs/testing';
import { SystemTranslationsService } from './system-translations.service';

describe('SystemTranslationsService', () => {
  let service: SystemTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemTranslationsService],
    }).compile();

    service = module.get<SystemTranslationsService>(SystemTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
