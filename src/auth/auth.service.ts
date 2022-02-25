import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as CryptoJS from "crypto-js";
import { UsersRolesService } from 'src/main/users-roles/users-roles.service';
import { UsersService } from './../main/users/users.service';
import { WildDuckService } from 'src/main/wild-duck/wild-duck.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private roleService: UsersRolesService,
    private wildDuckService: WildDuckService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.findByEmail(email);

    return await bcrypt.compare(pass, user.password).then(function (isMatch) {
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    });
  }

  async login(req) {

    const user = req.body;
    const userEmail = user.email.toLowerCase();

    return this.validateUser(userEmail, user.password).then(async (authUser) => {

      if (authUser === undefined || authUser === null) {
        return {
          error: 'invalid username or password',
        };
      }

      //TODO:low:Mohsin Use populate when getting user info
      const role = await this.roleService.findOne(req, { _id: authUser['userRole'] });

      const isSuperUser = role['isSuperUser'] ? role['isSuperUser'] : false;
      authUser['isSuperUser'] = isSuperUser;

      const payload = { _id: authUser._id, entity: authUser.entity, role: authUser.userRole, recordLimit: authUser.recordLimit, email: authUser.email, date: new Date() };

      return {
        accessToken: this.jwtService.sign(payload),
        user: CryptoJS.AES.encrypt(JSON.stringify(authUser), process.env.CRYPTOJS_SECRET).toString()
      };

    }).catch(() => {
      return {
        error: 'invalid email or password',
      };
    });
  }
  async signUp(user: any, Dto: any) {

    const userEmail = Dto.email.toLowerCase();

    const userData = await this.usersService.findByEmail(userEmail);

    if (userData === undefined || userData === null) {

      return this.usersService.register(Dto).then(result => {

        const payload = { _id: result._id, email: result.email, date: new Date() };

        return {
          accessToken: this.jwtService.sign(payload),
          user: CryptoJS.AES.encrypt(JSON.stringify(result), process.env.CRYPTOJS_SECRET).toString()
        };

      }).catch(() => {

        return {
          error: 'registration failed',
        };

      });
    } else {

      return {
        error: 'user already exists with this email',
      };

    }
  }


  public async sendForgetPasswordEmail(req) {

    const userEmail = req.query.email.toLowerCase();

    const userData = await this.usersService.findByEmail(userEmail);
    if (userData === undefined || userData === null) {
      return {
        error: 'user not found with this email'
      }
    }
    const payload = { _id: userData._id, entity: userData.entity, role: userData.userRole, recordLimit: userData.recordLimit, email: userData.email, date: new Date() };

    return await this.generateAndSendToken(payload);

  }

  private async generateAndSendToken(payload): Promise<any> {

    await this.usersService.updateWithQuery({ _id: payload._id }, {

      passwordResetToken: this.jwtService.sign(payload),
      passwordResetExpires: Date.now() + 3600000 // 1 hour
      
    })

      const mailPayload = {
        to: [{
          address:payload.email
        }],
        subject:'Forget Password',
        html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:<br><br>
        <a href="${process.env.siteUrl}new-password?token=${this.jwtService.sign(payload)}" target="_blank">http://localhost:4200/new-password?token=${this.jwtService.sign(payload)}</a><br><br>
        If you did not request this, please ignore this email and your password will remain unchanged.<br></p>`,
  
    } as any;
    const url = process.env.WILD_DUCK_URI + '/users/' + '5e6f4f7f92cd850eb5c5afa6' + '/submit' + '?accessToken=' + process.env.WILD_DUCK_TOKEN;

    return await this.wildDuckService.submitMessage(mailPayload,url);

  }

  public async resetPassword(req): Promise<any>{

    const user = await this.usersService._findOne({$and:[{passwordResetToken:req.query.token},{passwordResetExpires:{$gt:Date.now()}}]},'',{})
   
    if (user === undefined || user === null) {
      return {
        error: 'password reset token is invalid or has expired'
      }
    }
    const payload = {
      password:req.query.pass,
      passwordResetToken: undefined,
      passwordResetExpires: undefined
    }
    return await this.usersService.updateWithQuery({_id:user._id},payload)
  }

  decodeJwt(token: any) {
    return this.jwtService.decode(token);
  }


}
