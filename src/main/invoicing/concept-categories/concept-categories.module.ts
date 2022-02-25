import { Module } from '@nestjs/common';
import { ConceptCategoriesController } from './concept-categories.controller';
import { ConceptCategoriesService } from './concept-categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConceptCategoriesSchema } from './schemas/concept-categories.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ConceptCategories', schema: ConceptCategoriesSchema }])],
  controllers: [ConceptCategoriesController],
  providers: [ConceptCategoriesService]
})
export class ConceptCategoriesModule { }
