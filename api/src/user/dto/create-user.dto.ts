import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username', nullable: false })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsString()
  @MinLength(8)
  password: string;
}
