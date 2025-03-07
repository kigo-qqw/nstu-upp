import type { TokenDto } from "~/dto/auth/token.dto";
import type { UserDto } from "~/dto/auth/user.dto";

export interface LoginResponseDto {
  token: TokenDto;
  user: UserDto;
}
