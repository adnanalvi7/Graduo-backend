import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AttachmentsModule } from './main/attachments/attachments.module';
import { CnaeModule } from './main/cane/cnae.module';
import { CollegeModule } from './main/college/college.module';
import { CompaniesModule } from './main/companies/companies.module';
import { ConsultingFirmsModule } from './main/consulting-firms/consulting-firms.module';
import { CountriesModule } from './main/countries/countries.module';
import { DepartmentsModule } from './main/departments/departments.module';
import { EntityModule } from './main/entity/entity.module';
import { InvoicingModule } from './main/invoicing/invoicing.module';
import { ProvincesModule } from './main/provinces/provinces.module';
import { RegionsModule } from './main/regions/regions.module';
import { SicModule } from './main/sic/sic.module';
import { SystemLanguagesModule } from './main/system-languages/system-languages.module';
import { SystemMenusModule } from './main/system-menus/system-menus.module';
import { SystemTranslationsModule } from './main/system-translations/system-translations.module';
import { TicketsCommentsModule } from './main/tickets-comments/tickets-comments.module';
import { TicketsModule } from './main/tickets/tickets.module';
import { TransactionsBalanceModule } from './main/transactions-balance/transactions-balance.module';
import { TransactionsItemsModule } from './main/transactions-items/transactions-items.module';
import { TransactionsKardexModule } from './main/transactions-kardex/transactions-kardex.module';
import { TransactionsQuotesModule } from './main/transactions-quotes/transactions-quotes.module';
import { TransactionsModule } from './main/transactions/transactions.module';
import { UsersRolesModule } from './main/users-roles/users-roles.module';
import { UsersModule } from './main/users/users.module';
import { ActivitiesModule } from './main/activities/activities.module';
import { EmailModule } from './main/email/email.module';
import { WildDuckModule } from './main/wild-duck/wild-duck.module';
import { InvoiceModule } from './main/invoice-module/invoice/invoice.module';
import { InvoicePaymentModule } from './main/invoice-module/invoice-payment/invoice-payment.module';
import { RequestModule } from './main/request/request.module';
import { EmailTemplateModule } from './main/email-template/email-template.module';
import { OutgoingMailServerModule } from './main/outgoing-mail-server/outgoing-mail-server.module';
import { AppConfigurationModule } from './main/app-configuration/app-configuration.module';
import { DocumentModule } from './main/documents/document.module';
import { SharedDocumentsModule } from './main/shared-documents/shared-documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env.prod'],
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('simple-mongoose-autoincrement'), { field: 'number_id' });
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-paginate'));
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-diff-tracking/diffHistory').plugin, { uri: process.env.MONGODB_URI });
          return connection;
        }
      }),
    AuthModule,
    UsersModule,
    SystemLanguagesModule,
    SystemMenusModule,
    SystemTranslationsModule,
    DepartmentsModule,
    UsersRolesModule,
    EntityModule,
    TransactionsModule,
    TransactionsItemsModule,
    TransactionsBalanceModule,
    TransactionsQuotesModule,
    TransactionsKardexModule,
    CountriesModule,
    RegionsModule,
    ProvincesModule,
    ConsultingFirmsModule,
    CompaniesModule,
    AttachmentsModule,
    TicketsModule,
    TicketsCommentsModule,
    CnaeModule,
    SicModule,
    CollegeModule,
    InvoicingModule,
    ActivitiesModule,
    EmailModule,
    WildDuckModule,
    InvoiceModule,
    InvoicePaymentModule,
    RequestModule,
    EmailTemplateModule,
    OutgoingMailServerModule,
    AppConfigurationModule,
    DocumentModule,
    SharedDocumentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    });
  }
}
