import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../enum';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.INVALID_TOKEN,
    });
  }
}
