import { User } from './entity/user.entity';
import { PublicUserDto, UserDto } from './dto';

export class UserMapper {
  public static toDto(user: User): UserDto {
    return {
      ...UserMapper.toPublicUserDto(user),
      email: user.email,
    };
  }

  public static toPublicUserDto(user: User): PublicUserDto {
    return {
      id: user.id,
      name: user.name,
    };
  }
}
