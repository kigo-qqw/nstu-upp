import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { Member } from '../../member/entity/member.entity';
import { ProjectPermissionType } from '../enum';

@Entity()
export class ProjectPermission extends BaseEntity {
  @OneToOne(() => Member, (member) => member.projectPermission, {
    cascade: true,
  })
  @JoinColumn()
  member: Member;

  @Column({
    type: 'enum',
    enum: ProjectPermissionType,
    array: true,
    nullable: false,
  })
  type: ProjectPermissionType[];
}
