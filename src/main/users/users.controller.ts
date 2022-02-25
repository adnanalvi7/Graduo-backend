import { Controller, Request, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController extends BaseController {
  constructor(protected readonly service: UsersService) {
    super(service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-password/:id')
  async login(@Request() req, @Body() Dto: any, @Param('id') id) {
    return await this.service.update(req, id, Dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('add-emails-signature/:id')
  async addSignature( @Body() Dto: any, @Param('id') id) {
    return await this.service.addSignature( id, Dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-emails-signature/:id')
  async findEmailsSignature(@Param('id') id) {
    return await this.service.findEmailsSignature(id);
  }

}
