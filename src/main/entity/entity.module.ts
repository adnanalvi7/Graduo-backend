import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { EntitySchema } from './schemas/entity.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Entity', schema: EntitySchema }])],
  controllers: [EntityController],   
  providers: [EntityService],
  exports: [EntityService]
})
export class EntityModule {}
