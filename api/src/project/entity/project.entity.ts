import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Member } from '../../member/entity/member.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { Board } from '../../board/entity/board.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.ownedProjects, { cascade: true })
  owner: User;

  @OneToMany(() => Member, (member) => member.project, { cascade: true })
  // @JoinColumn()
  members: Member[];

  @OneToMany(() => Board, (board) => board.project, { cascade: true })
  // @JoinColumn()
  boards: Board[];
}
