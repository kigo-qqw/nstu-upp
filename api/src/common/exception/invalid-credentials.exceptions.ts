import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../enum';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.INVALID_CREDENTIALS,
      message: 'Invalid credentials',
    });
  }
}
