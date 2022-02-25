import { BaseService } from '../../../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ConceptCategories } from './interfaces/concept-categories.interface';

@Injectable()
export class ConceptCategoriesService extends BaseService {
  constructor(@InjectModel('ConceptCategories') protected readonly model: PaginateModel<ConceptCategories>) {
    super(model);
  }
  async findAttributeList(): Promise<any> {
    return this.model.find();;
  }
}

