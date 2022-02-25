import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { SystemLanguagesSchema } from 'src/main/system-languages/schemas/system-languages.schema';
import { SystemLanguagesService } from 'src/main/system-languages/system-languages.service';
import { SystemTranslationsSchema } from 'src/main/system-translations/schemas/system-translations.schema';
import { SystemTranslationsController } from 'src/main/system-translations/system-translations.controller';
import { SystemTranslationsService } from 'src/main/system-translations/system-translations.service';

@Module({
  imports: [MulterModule, MongooseModule.forFeature([
    { name: 'SystemTranslations', schema: SystemTranslationsSchema },
    { name: 'SystemLanguages', schema: SystemLanguagesSchema },
  ])],
  controllers: [SystemTranslationsController],
  providers: [SystemTranslationsService, SystemLanguagesService],
  exports: [SystemTranslationsService]
})
export class SystemTranslationsModule { }
