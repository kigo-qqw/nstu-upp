import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { Member } from '../../member/entity/member.entity';

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Task, { nullable: true })
  parent?: Task;

  @ManyToOne(() => Board, (board) => board.tasks, { nullable: false })
  board: Board;

  @ManyToOne(() => Member, { nullable: false })
  owner: Member;

  @ManyToMany(() => Member)
  performers: Member[];
}
