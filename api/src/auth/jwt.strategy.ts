import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './dto';
import { User } from '../user/entity/user.entity';
import { InvalidCredentialsException } from '../common/exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    public readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TOKEN_SECRET')!,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    try {
      console.log('JwtStrategy validate');
      const res = await this.userService.findOneById(payload.id);
      console.log('JwtStrategy validate2');
      return res;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new InvalidCredentialsException();
      } else throw e;
    }
  }
}
