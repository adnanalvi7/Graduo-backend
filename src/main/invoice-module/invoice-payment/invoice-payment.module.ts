import { SystemLanguagesService } from './../../system-languages/system-languages.service';
import { SystemLanguagesSchema } from './../../system-languages/schemas/system-languages.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from '../invoice/invoice.schema';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoicePaymentController } from './invoice-payment.controller';
import { InvoicePaymentSchema } from './invoice-payment.schema';
import { InvoicePaymentService } from './invoice-payment.service';
import { SystemTranslationsSchema } from 'src/main/system-translations/schemas/system-translations.schema';
import { SystemTranslationsService } from 'src/main/system-translations/system-translations.service';
import { EmailTemplateService } from 'src/main/email-template/email-template.service';
import { EmailTemplateSchema } from 'src/main/email-template/email-template.schema';
import { InvoiceMovementsSchema } from 'src/main/invoicing/invoice-movement/schemas/invoice-movement.schema';
import { InvoiceMovementsService } from 'src/main/invoicing/invoice-movement/invoice-movement.service';
import { WildDuckSchema } from 'src/main/wild-duck/schemas/wild-duck.schema';
import { WildDuckService } from 'src/main/wild-duck/wild-duck.service';
import { UsersSchema } from 'src/main/users/schemas/users.schema';
import { UsersService } from 'src/main/users/users.service';
import { AppConfigurationService } from 'src/main/app-configuration/app-configuration.service';
import { AppConfigurationSchema } from 'src/main/app-configuration/schemas/app-configuration.schema';
import { EntityModule } from 'src/main/entity/entity.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'InvoicePayment', schema: InvoicePaymentSchema },
      { name: 'Invoice', schema: InvoiceSchema },
      { name: 'SystemLanguages', schema: SystemLanguagesSchema },
      { name: 'SystemTranslations', schema: SystemTranslationsSchema },
      { name: 'EmailTemplate', schema: EmailTemplateSchema },
      { name: 'InvoiceMovement', schema: InvoiceMovementsSchema },
      { name: 'WildDuck', schema: WildDuckSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'AppConfiguration', schema: AppConfigurationSchema }


    ]),
EntityModule
  ],
  controllers: [InvoicePaymentController],
  providers: [
    InvoicePaymentService,
    InvoiceService,
    SystemTranslationsService,
    SystemLanguagesService,
    EmailTemplateService,
    InvoiceMovementsService,
    WildDuckService, UsersService,
    AppConfigurationService],
  exports: [InvoicePaymentService],
})
export class InvoicePaymentModule { }
