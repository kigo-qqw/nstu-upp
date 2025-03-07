import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto, TokenDto } from './dto';
import { TokenError, TokenType } from './enum';
import {
  AccessTokenExpiredException,
  InvalidTokenException,
  RefreshTokenExpiredException,
} from '../common/exception';

@Injectable()
export class TokenService {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateAuthToken(payload: JwtPayloadDto): Promise<TokenDto> {
    const accessTokenExpires = this.configService.get<number>(
      'ACCESS_TOKEN_EXPIRES_IN',
    )!;
    const refreshTokenExpires = this.configService.get<number>(
      'REFRESH_TOKEN_EXPIRES_IN',
    )!;
    const tokenType = this.configService.get<string>('TOKEN_TYPE')!;
    const accessToken = await this.generateToken(payload, accessTokenExpires);
    const refreshToken = await this.generateToken(payload, refreshTokenExpires);
    this.logger.log(
      `create token ${{ tokenType, accessToken, accessTokenExpires, refreshToken } as TokenDto}`,
    );
    return { tokenType, accessToken, accessTokenExpires, refreshToken };
  }

  public async generateRefreshToken(refreshToken: string) {
    const payload = await this.verifyToken(
      refreshToken,
      TokenType.REFRESH_TOKEN,
    );
    return this.generateAuthToken(payload);
  }

  public async verifyToken(
    token: string,
    tokenType: TokenType,
  ): Promise<JwtPayloadDto> {
    try {
      this.logger.log(`verifyToken token ${token}`);
      const res: JwtPayloadDto = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('TOKEN_SECRET')!,
      });
      this.logger.log('verifyToken2');
      return res;
    } catch ({ name }) {
      if (
        name == TokenError.TOKEN_EXPIRED_ERROR &&
        tokenType == TokenType.ACCESS_TOKEN
      ) {
        console.log('access expired');
        throw new AccessTokenExpiredException();
      }
      if (
        name == TokenError.TOKEN_EXPIRED_ERROR &&
        tokenType == TokenType.REFRESH_TOKEN
      ) {
        console.log('refresh expired');
        throw new RefreshTokenExpiredException();
      }

      console.log(`other error ${name}`);
      throw new InvalidTokenException();
    }
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      this.logger.log('validateToken');
      const { id }: { id: number } = await this.jwtService.verifyAsync(token);

      try {
        await this.userService.findOneById(id); // ignore result User
        return true;
      } catch (e) {
        if (e instanceof NotFoundException) {
          return false;
        } else throw e;
      }
    } catch (error) {
      this.logger.error(`Validation token error: ${error}`);
      return false;
    }
  }

  private async generateToken(
    payload: JwtPayloadDto,
    expiresIn: number,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.get<string>('TOKEN_SECRET')!,
    });
  }
}
