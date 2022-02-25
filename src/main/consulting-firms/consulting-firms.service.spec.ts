import { Test, TestingModule } from '@nestjs/testing';
import { ConsultingFirmsService } from './consulting-firms.service';

describe('ConsultingFirmsService', () => {
  let service: ConsultingFirmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultingFirmsService],
    }).compile();

    service = module.get<ConsultingFirmsService>(ConsultingFirmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
