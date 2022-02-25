import { Controller, Post, Request } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(
        protected readonly service: EmailService,
    ) {
    }

    @Post()
    async sendEmail(@Request() req) {
        return await this.service.sendEmail(req);
    };
}


