import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../../project/entity/project.entity';
import { Task } from '../../task/entity/task.entity';

@Entity()
export class Board extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.boards)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Task, (task) => task.board)
  @JoinColumn()
  tasks: Task[];
}
