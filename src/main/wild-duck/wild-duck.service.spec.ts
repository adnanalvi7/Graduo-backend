import { Test, TestingModule } from '@nestjs/testing';
import { WildDuckService } from './wild-duck.service';

describe('WildDuckService', () => {
  let service: WildDuckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WildDuckService],
    }).compile();

    service = module.get<WildDuckService>(WildDuckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
