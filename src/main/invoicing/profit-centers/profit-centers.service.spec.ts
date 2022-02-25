import { Test, TestingModule } from '@nestjs/testing';
import { ProfitCentersService } from './profit-centers.service';

describe('ProfitCentersService', () => {
  let service: ProfitCentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfitCentersService],
    }).compile();

    service = module.get<ProfitCentersService>(ProfitCentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
