import { BaseController } from '../../common/base/base.controller';
import { Controller, Get } from '@nestjs/common';
import { SystemLanguagesService } from './system-languages.service';

@Controller('system-languages')
export class SystemLanguagesController extends BaseController {
    constructor(protected readonly service: SystemLanguagesService){
        super(service);
    }
    @Get('load')
    async load(): Promise<any> {
        return this.service.Load();
    }
}
