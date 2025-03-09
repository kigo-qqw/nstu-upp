import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class InviteUserDto {
  @IsInt() @IsNotEmpty() projectId: number;
  @IsEmail() @IsNotEmpty() userEmail: string;
}
