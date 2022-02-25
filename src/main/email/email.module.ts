import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
// , HandlebarsAdapter
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env.prod'],
    }),
    MailerModule.forRoot({
      transport: {
        pool: true,
        host: process.env.host,
        port:  465,
        secure:true, // use TLS
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
      },
      template: {
        // adapter: new HandlebarsAdapter(),
        options: {
          strict: process.env.strict,
        },
      }
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
