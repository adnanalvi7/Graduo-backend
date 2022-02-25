import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CnaeController } from './cnae.controller';
import { CnaeService } from './cnae.service';
import { CnaeSchema } from './schemas/cnae.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cnae', schema: CnaeSchema }])],
  controllers: [CnaeController],   
  providers: [CnaeService],
  exports: [CnaeService]
})
export class CnaeModule {}
