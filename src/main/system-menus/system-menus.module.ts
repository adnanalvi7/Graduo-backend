import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemMenusController } from './system-menus.controller';
import { SystemMenusService } from './system-menus.service';
import { SystemMenusSchema } from './schemas/system-menus.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'SystemMenus', schema: SystemMenusSchema }])],
  controllers: [SystemMenusController],   
  providers: [SystemMenusService],
  exports: [SystemMenusService]
})
export class SystemMenusModule {}
