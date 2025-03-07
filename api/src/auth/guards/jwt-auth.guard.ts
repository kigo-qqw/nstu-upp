import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token.service';
import { Reflector } from '@nestjs/core';
import { SKIP_AUTH } from '../constants';
import { ExtractJwt } from 'passport-jwt';
import { InvalidTokenException } from '../../common/exception';
import { TokenType } from '../enum';
import { request } from 'express';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(`skipAuth: ${skipAuth}`);
    if (skipAuth) {
      console.log('if skipAuth true');
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    console.log(`accessToken: ${accessToken}`);

    if (!accessToken) {
      throw new InvalidTokenException();
    }

    console.log(`accessToken: ${accessToken}`);

    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS_TOKEN,
    );

    request['user'] = await this.userService.findOneById(payload.id);

    console.log(payload);

    return true;
  }
}
