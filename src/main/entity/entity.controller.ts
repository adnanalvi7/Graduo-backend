import { Controller, Get, Post, Request, Body, UseGuards } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { EntityService } from './entity.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('entities')
export class EntityController extends BaseController {
  constructor(protected readonly service: EntityService) {
    super(service);
  }

  // TODO: this should in base controller 
  
  @UseGuards(JwtAuthGuard)
  @Post('list')
  async findAttributeList(@Request() request,@Body() body): Promise<any> {
    return await this.service.findAttributeList();
  }
  
  @Post('find-all')
  async findEntities(@Request() request,@Body() body): Promise<any> {
    return await this.service.findEntities(request,body);
  }
}
