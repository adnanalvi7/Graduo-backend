import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { EmailTemplateService } from './email-template.service';

@Controller('email-template')
export class EmailTemplateController extends BaseController {

  constructor(
    protected readonly service: EmailTemplateService,

  ) {
    super(service);
  }
}
