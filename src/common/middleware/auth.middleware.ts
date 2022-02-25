import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './../../auth/auth.service';
import { EntityService } from './../../main/entity/entity.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private entityService: EntityService
  ) { }
  use(req: any, res: Response, next: Function) {
    if (req.header('Authorization')) {
      const jwtToken = req.header('Authorization');
      const TokenArray = jwtToken.split(" ");
      req.user = this.authService.decodeJwt(TokenArray[1]);
      this.entityService.findOne(req, { _id: req.user.entity }).then((entity) => {
        // this.entityService.findOne(req, { number_id: req.user.entity }).then((entity) => {
        req.entityObj = entity;

        if (process.env['mode'] && process.env['mode'] == 'dev') {
          setTimeout(function () {
            next();
          }, (Math.floor(Math.random() * this.maxDelay())));
        }
        else {
          next();
        }

      });
    } else {
      if (process.env['mode'] && process.env['mode'] == 'dev') {
        setTimeout(function () {
          next();
        }, (Math.floor(Math.random() * this.maxDelay())));
      }
      else {
        next();
      }
    }
  }

  private maxDelay(): number {

    if (process.env['API_DELAY_MAX']) {
      return Number(process.env['API_DELAY_MAX'])
    }
    else {
      return 2000;
    }

  }
}