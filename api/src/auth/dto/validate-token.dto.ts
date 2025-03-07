import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ValidateTokenResponseDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  valid: boolean;
}
