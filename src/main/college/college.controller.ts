import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { CollegeService } from './college.service';

@Controller('college')
export class CollegeController extends BaseController {
    constructor(protected readonly service: CollegeService){
        super(service);
    }
}
