import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Project } from '../../project/entity/project.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { ProjectPermission } from '../../project-permission/entity/project-permission.entity';

@Entity()
export class Member extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Project)
  project: Project;

  @OneToOne(() => ProjectPermission)
  projectPermission: ProjectPermission;
}
