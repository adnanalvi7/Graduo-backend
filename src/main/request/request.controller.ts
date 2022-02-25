import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController extends BaseController {
  constructor(protected readonly service: RequestService) {
    super(service);
  }

}
