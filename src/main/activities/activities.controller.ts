import { Controller, Post, UseGuards, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { BaseController } from '../../common/base/base.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('activities')
export class ActivitiesController extends BaseController {
    constructor(protected readonly service: ActivitiesService) {
        super(service);
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async findActivities() {
      return await this.service.findActivities();
    }
}
