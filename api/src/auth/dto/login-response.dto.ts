import { IsNotEmpty, ValidateNested } from 'class-validator';
import { TokenDto } from './token.dto';
import { UserDto } from '../../user/dto';

export class LoginResponseDto {
  @IsNotEmpty() @ValidateNested() token: TokenDto;
  @IsNotEmpty() @ValidateNested() user: UserDto;
}
