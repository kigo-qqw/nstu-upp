import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import {
  AuthCredentialsDto,
  LoginResponseDto,
  RefreshTokenDto,
  RegisterDto,
  TokenDto,
  ValidateTokenRequestDto,
  ValidateTokenResponseDto,
} from './dto';
import { SkipAuth } from './decorators';
import { ApiTags } from '@nestjs/swagger';

@SkipAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<LoginResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(authCredentialsDto);
  }

  @Post('/token/refresh')
  async getNewToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenDto> {
    return this.tokenService.generateRefreshToken(refreshTokenDto.refreshToken);
  }

  @Post('/token/validate')
  async validateToken(
    @Body(ValidationPipe) validateTokenRequestDto: ValidateTokenRequestDto,
  ): Promise<ValidateTokenResponseDto> {
    return {
      valid: await this.tokenService.validateToken(
        validateTokenRequestDto.token,
      ),
    };
  }
}
