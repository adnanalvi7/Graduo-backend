import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { OutgoingMailServer } from './outgoing-mail-server.interface';


@Injectable()
export class OutgoingMailServerService extends BaseService {

  constructor(
    @InjectModel('OutgoingMailServer')
    protected readonly model: PaginateModel<OutgoingMailServer>,
  ) {
    super(model);
  }
  async findAttributeList(): Promise<any>{
    return this.model.find();
}
}
