import { ProjectPermission } from './entity/project-permission.entity';
import { ProjectPermissionDto } from './dto';

export class ProjectPermissionMapper {
  public static toDto(permission: ProjectPermission): ProjectPermissionDto {
    return {
      id: permission.id,
      userId: permission.member.user.id,
      projectId: permission.member.project.id,
      type: permission.type,
    };
  }
}
