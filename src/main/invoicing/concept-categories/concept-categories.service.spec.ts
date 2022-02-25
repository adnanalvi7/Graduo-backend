import { Test, TestingModule } from '@nestjs/testing';
import { ConceptCategoriesService } from './concept-categories.service';

describe('ConceptCategoriesService', () => {
  let service: ConceptCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptCategoriesService],
    }).compile();

    service = module.get<ConceptCategoriesService>(ConceptCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
