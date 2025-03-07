import type { PublicUserDto } from "~/dto/auth/public-user.dto";

export interface UserDto extends PublicUserDto {
  email: string;
}
