import { BaseEntity } from '../../common/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { Member } from '../../member/entity/member.entity';

@Entity()
export class Task extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Task, { nullable: true })
  @JoinColumn()
  parent?: Task;

  @ManyToOne(() => Board, (board) => board.tasks, { nullable: false })
  @JoinColumn()
  board: Board;

  @ManyToOne(() => Member, { nullable: false })
  @JoinColumn()
  owner: Member;

  @ManyToMany(() => Member, { nullable: false })
  @JoinTable()
  performers: Member[];

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  plannedStartAt: Date;

  @Column({ nullable: false })
  plannedEndAt: Date;

  @Column({ nullable: true })
  actuallyStartAt?: Date;

  @Column({ nullable: true })
  actuallyEndAt?: Date;
}
