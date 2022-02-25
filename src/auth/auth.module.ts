import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from './../main/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRolesSchema } from 'src/main/users-roles/schemas/users-roles.schema';
import { UsersRolesService } from 'src/main/users-roles/users-roles.service';
import { WildDuckService } from 'src/main/wild-duck/wild-duck.service';
import { WildDuckSchema } from 'src/main/wild-duck/schemas/wild-duck.schema';
import { AppConfigurationModule } from 'src/main/app-configuration/app-configuration.module';
import { EntityModule } from 'src/main/entity/entity.module';
@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1day' },
    }),
    MongooseModule.forFeature([{ name: 'UsersRoles', schema: UsersRolesSchema },{name: 'WildDuck', schema: WildDuckSchema }]),
AppConfigurationModule,
EntityModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersRolesService,WildDuckService],
  exports: [AuthService, UsersRolesService],
})
export class AuthModule { }