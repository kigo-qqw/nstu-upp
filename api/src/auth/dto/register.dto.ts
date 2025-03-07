import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john@doe.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwerty12345' })
  password: string;
}
