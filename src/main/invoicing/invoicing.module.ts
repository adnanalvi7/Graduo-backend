import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
// , HandlebarsAdapter
import { ConceptCategoriesModule } from './concept-categories/concept-categories.module';
import { InvoiceConceptsModule } from './invoice-concepts/invoice-concepts.module';
import { InvoiceMovementsModule } from './invoice-movement/invoice-moments.module';
import { InvoiceSeriesModule } from './invoice-series/invoice-series.module';
import { InvoiceVatModule } from './invoice-vat/invoice-vat.module';
import { PaymentModesModule } from './payment-modes/payment-modes.module';
import { PaymentTermModule } from './payment-term/payment-term.module';
import { ProfitCentersModule } from './profit-centers/profit-centers.module';

@Module({
  imports: [
    InvoiceSeriesModule,
    ConceptCategoriesModule,
    PaymentModesModule,
    InvoiceVatModule,
    InvoiceConceptsModule,
    ProfitCentersModule,
    PaymentTermModule,
    InvoiceMovementsModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'test.optima123@gmail.com',
          pass: 'mnbvcxz12345@',
        },
      },
      template: {
        dir: process.cwd() + '/template/',
        // adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],

})
export class InvoicingModule { }
