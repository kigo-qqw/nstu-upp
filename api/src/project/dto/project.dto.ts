import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PublicUserDto } from 'src/user/dto/public-user.dto';

export class ProjectDto {
  @IsInt() @IsNotEmpty() id: number;
  @IsString() @IsNotEmpty() name: string;
  @ValidateNested() @IsNotEmpty() owner: PublicUserDto;
  @IsInt() @IsNotEmpty() memberIds: number[];
  @IsInt() @IsNotEmpty() boardIds: number[];
}
