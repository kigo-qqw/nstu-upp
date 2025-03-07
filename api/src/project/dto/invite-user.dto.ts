import { IsInt } from 'class-validator';

export class InviteUserDto {
  @IsInt() userId: number;
  @IsInt() projectId: number;
}
