import { Test, TestingModule } from '@nestjs/testing';
import { ConceptCategoriesController } from './concept-categories.controller';

describe('ConceptCategories Controller', () => {
  let controller: ConceptCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptCategoriesController],
    }).compile();

    controller = module.get<ConceptCategoriesController>(ConceptCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
