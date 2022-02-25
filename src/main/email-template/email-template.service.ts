import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { EmailTemplateInterface } from './email-template.interface';
// TODO:Adnan: Spacing between functions are not proper
@Injectable()
export class EmailTemplateService extends BaseService {
  constructor(
    @InjectModel('EmailTemplate')
    protected readonly model: PaginateModel<EmailTemplateInterface>,
  ) {
    super(model);
  }
  async findlist(query): Promise<any>{ // TODO:Adnan `findlist` naming convention is wrong and name of this function is wrong as per this function is not returning any list. It is returning only one record.
    return this.model.findOne(query).populate('outGoingMailServerId').lean();
}
}
