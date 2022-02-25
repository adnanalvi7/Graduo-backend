import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigurationService } from 'src/main/app-configuration/app-configuration.service';
import { AppConfigurationSchema } from 'src/main/app-configuration/schemas/app-configuration.schema';
import { EmailTemplateModule } from 'src/main/email-template/email-template.module';
import { EmailTemplateSchema } from 'src/main/email-template/email-template.schema';
import { EmailTemplateService } from 'src/main/email-template/email-template.service';
import { InvoiceMovementsService } from 'src/main/invoicing/invoice-movement/invoice-movement.service';
import { InvoiceMovementsSchema } from 'src/main/invoicing/invoice-movement/schemas/invoice-movement.schema';
import { SystemTranslationsSchema } from 'src/main/system-translations/schemas/system-translations.schema';
import { SystemTranslationsService } from 'src/main/system-translations/system-translations.service';
import { UsersSchema } from 'src/main/users/schemas/users.schema';
import { UsersService } from 'src/main/users/users.service';
import { WildDuckSchema } from 'src/main/wild-duck/schemas/wild-duck.schema';
import { WildDuckService } from 'src/main/wild-duck/wild-duck.service';
import { SystemLanguagesSchema } from './../../system-languages/schemas/system-languages.schema';
import { SystemLanguagesService } from './../../system-languages/system-languages.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceSchema } from './invoice.schema';
import { InvoiceService } from './invoice.service';
import { EntityModule } from 'src/main/entity/entity.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema },
    { name: 'EmailTemplate', schema: EmailTemplateSchema },
    { name: 'SystemTranslations', schema: SystemTranslationsSchema },
    { name: 'SystemLanguages', schema: SystemLanguagesSchema },
    { name: 'InvoiceMovement', schema: InvoiceMovementsSchema },
    { name: 'WildDuck', schema: WildDuckSchema },
    { name: 'Users', schema: UsersSchema },
    { name: 'AppConfiguration', schema: AppConfigurationSchema }


    ]),
    EmailTemplateModule,
    EntityModule
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    EmailTemplateService,
    SystemTranslationsService,
    SystemLanguagesService,
    InvoiceMovementsService,
    WildDuckService,
    UsersService,
    AppConfigurationService

  ],
  exports: [InvoiceService, EmailTemplateService],
})
export class InvoiceModule { }
