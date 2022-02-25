
import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../../../common/base/base.controller';
import { ConceptCategoriesService } from './concept-categories.service';

@Controller('concept-categories')
export class ConceptCategoriesController extends BaseController {
  constructor(protected readonly service: ConceptCategoriesService) {
    super(service);
  }
  @Get('list')
  async findAttributeList(): Promise<any> {
    return this.service.findAttributeList();
  }
}


