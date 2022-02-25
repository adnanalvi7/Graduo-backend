import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(req) {
    return await this.mailerService
      .sendMail({
        to: req.body.to, 
        subject: req.body.subject, 
        template: req.body.templateFile, // The `.hbs` extension is appended automatically.
        context: req.body.data, // Data to be sent to template engine.
      })
      .then(success => {
        return success;
      })
      .catch(err => {
        return err;
      });
  }
}
