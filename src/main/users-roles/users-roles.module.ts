import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRolesController } from './users-roles.controller';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesSchema } from './schemas/users-roles.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'UsersRoles', schema: UsersRolesSchema }])],
  controllers: [UsersRolesController],   
  providers: [UsersRolesService],
  exports: [UsersRolesService]
})
export class UsersRolesModule {}
