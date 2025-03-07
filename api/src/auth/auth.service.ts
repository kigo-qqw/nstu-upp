import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from './token.service';
import {
  AuthCredentialsDto,
  JwtPayloadDto,
  LoginResponseDto,
  RegisterDto,
} from './dto';
import { InvalidCredentialsException } from '../common/exception';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginResponseDto> {
    let user: User;
    try {
      user = await this.userService.findOneByEmail(authCredentialsDto.email);
    } catch {
      throw new InvalidCredentialsException();
    }

    // TODO: hash+salt
    if (user.encryptedPassword !== authCredentialsDto.password) {
      throw new InvalidCredentialsException();
    }

    const payload: JwtPayloadDto = { id: user.id };
    const token = await this.tokenService.generateAuthToken(payload);
    return { token, user };
  }

  public async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const user = await this.userService.create({ ...registerDto });
    const payload: JwtPayloadDto = { id: user.id };
    const token = await this.tokenService.generateAuthToken(payload);
    return { token, user };
  }
}
