import { BaseController } from '../../common/base/base.controller';
import { Controller, Get, Request, Body, Post } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';

@Controller('users-roles')
export class UsersRolesController extends BaseController {
    constructor(protected readonly service: UsersRolesService) {
        super(service);
    }
    @Get ('list')
    async findAttributeList(): Promise<any> {
        return await this.service.findAttributeList();
    }
    @Post('find-all')
    async findRole(@Request() request,@Body() body): Promise<any> {
      return await this.service.findRole(request,body);
    }
}
