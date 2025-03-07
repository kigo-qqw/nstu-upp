import { ProjectDto } from './dto';
import { Project } from './entity/project.entity';
import { UserMapper } from '../user/user.mapper';

export class ProjectMapper {
  public static toDto(project: Project): ProjectDto {
    return {
      id: project.id,
      name: project.name,
      owner: UserMapper.toPublicUserDto(project.owner),
      memberIds: project.members.map((m) => m.id),
      boardIds: project.boards.map((b) => b.id),
    };
  }
}
