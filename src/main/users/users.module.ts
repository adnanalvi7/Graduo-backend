import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './schemas/users.schema';
import { AppConfigurationSchema } from '../app-configuration/schemas/app-configuration.schema';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';

@Module({
  imports: [MongooseModule.forFeature([
  {name: 'Users', schema: UsersSchema },
  { name: 'AppConfiguration', schema: AppConfigurationSchema }
])],
  controllers: [UsersController],   
  providers: [UsersService,AppConfigurationService],
  exports: [UsersService]
})
export class UsersModule {}
