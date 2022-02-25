import { Module } from '@nestjs/common';
import { ProfitCentersController } from './profit-centers.controller';
import { ProfitCentersService } from './profit-centers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfitCentersSchema } from './schemas/profit-centers.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ProfitCenters', schema: ProfitCentersSchema }])],
  controllers: [ProfitCentersController],
  providers: [ProfitCentersService]
})
export class ProfitCentersModule { }
