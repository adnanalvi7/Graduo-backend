import { Module } from '@nestjs/common';
import { AppConfigurationController } from './app-configuration.controller';
import { AppConfigurationService } from './app-configuration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigurationSchema } from './schemas/app-configuration.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'AppConfiguration', schema: AppConfigurationSchema }])],
  controllers: [AppConfigurationController],
  providers: [AppConfigurationService],
  exports: [AppConfigurationService]
})
export class AppConfigurationModule { }
