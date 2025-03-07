import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john@doe.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'qwerty12345' })
  password: string;
}
