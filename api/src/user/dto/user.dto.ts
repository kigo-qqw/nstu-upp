import { IsEmail, IsNotEmpty } from 'class-validator';
import { PublicUserDto } from './public-user.dto';

export class UserDto extends PublicUserDto {
  @IsEmail() @IsNotEmpty() email: string;
}
