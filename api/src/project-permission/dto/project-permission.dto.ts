import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ProjectPermissionType } from '../enum';

export class ProjectPermissionDto {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;

  @IsInt()
  projectId: number;

  @IsEnum(ProjectPermissionType, { each: true })
  type: ProjectPermissionType[];
}
