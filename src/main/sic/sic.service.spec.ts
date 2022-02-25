import { Test, TestingModule } from '@nestjs/testing';
import { SicService } from './sic.service';

describe('SicService', () => {
  let service: SicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SicService],
    }).compile();

    service = module.get<SicService>(SicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
