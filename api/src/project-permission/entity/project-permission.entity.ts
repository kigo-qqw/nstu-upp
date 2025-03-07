import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { Member } from '../../member/entity/member.entity';

export enum ProjectPermissionType {
  CREATE_BOARD = 'CREATE_BOARD',
  INVITE_USER = 'INVITE_USER',
}

@Entity()
export class ProjectPermission extends BaseEntity {
  @OneToOne(() => Member)
  member: Member;

  @Column({
    type: 'enum',
    enum: ProjectPermissionType,
    array: true,
    nullable: false,
  })
  type: ProjectPermissionType[];
}
