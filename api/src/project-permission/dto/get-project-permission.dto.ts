import { IsInt, IsNotEmpty } from 'class-validator';

export class GetProjectPermissionDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  projectId: number;
}
