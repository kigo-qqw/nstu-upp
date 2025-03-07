import { IsInt, IsString } from 'class-validator';

export class PublicUserDto {
  @IsInt() id: number;
  @IsString() name: string;
}
