import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemLanguagesController } from './system-languages.controller';
import { SystemLanguagesService } from './system-languages.service';
import { SystemLanguagesSchema } from './schemas/system-languages.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'SystemLanguages', schema: SystemLanguagesSchema }])],
  controllers: [SystemLanguagesController],   
  providers: [SystemLanguagesService],
  exports: [SystemLanguagesService]
})
export class SystemLanguagesModule {}
