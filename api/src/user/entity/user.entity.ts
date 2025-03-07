import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entity/project.entity';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'encrypted_password' })
  encryptedPassword: string;

  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects: Project[];
}
