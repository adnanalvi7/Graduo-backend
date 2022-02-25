import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './interface/request.interface';
import { PaginateModel } from 'mongoose';
import { BaseService } from '../../common/base/base.service';

@Injectable()
export class RequestService extends BaseService {

  constructor(@InjectModel('Request') protected readonly model: PaginateModel<Request>) {
    super(model);
  }

}

