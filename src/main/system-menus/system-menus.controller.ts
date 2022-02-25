import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Request } from '@nestjs/common';
import { SystemMenusService } from './system-menus.service';

@Controller('system-menus')
export class SystemMenusController extends BaseController {
    constructor(protected readonly service: SystemMenusService){
        super(service);
    }
    @Get('load')
    async load(): Promise<any> {
        return this.service.Load();
    }
    @Get('load-after-login')
    async loadAfterLogin(): Promise<any> {
        return this.service.LoadAfterLogin();
    }
    @Get('load-child')
    async loadChild(@Request() req): Promise<any> {
        return this.service.loadChild(req);
    }
}
