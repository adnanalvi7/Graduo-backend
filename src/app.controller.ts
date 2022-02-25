import { Controller, Get, UseGuards, Post, Request, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,

  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }
  @Post('auth/signup')
  async create(@Request() req, @Body() Dto: any): Promise<any> {
    return this.authService.signUp(req, Dto);
  }
  @Get('auth/forget-password')
  async sendForgetPasswordEmail(@Request() req): Promise<any> {
    return this.authService.sendForgetPasswordEmail(req);
  }
  @Get('auth/reset-password')
  async resetPassword(@Request() req): Promise<any> {
    return this.authService.resetPassword(req);
  }
}
