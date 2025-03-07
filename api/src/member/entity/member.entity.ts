import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Project } from '../../project/entity/project.entity';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity()
export class Member extends BaseEntity {
  @ManyToOne(() => User) user: User;
  @ManyToOne(() => Project) project: Project;
}
