import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WildDuckController } from './wild-duck.controller';
import { WildDuckService } from './wild-duck.service';
import { WildDuckSchema } from './schemas/wild-duck.schema';
import { UsersSchema } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { AppConfigurationSchema } from '../app-configuration/schemas/app-configuration.schema';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';
import { EntitySchema } from '../entity/schemas/entity.schema';
import { EntityService } from '../entity/entity.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'WildDuck', schema: WildDuckSchema },
  {name: 'Users', schema: UsersSchema  },
  { name: 'AppConfiguration', schema: AppConfigurationSchema },
  { name: 'Entity', schema: EntitySchema }

])],
  controllers: [WildDuckController],   
  providers: [WildDuckService,UsersService,AppConfigurationService,EntityService],
  exports: [WildDuckService]
})
export class WildDuckModule {}
