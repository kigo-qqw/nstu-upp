import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../enum';

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.REFRESH_TOKEN_EXPIRED,
      message: 'Refresh token has expired',
    });
  }
}
