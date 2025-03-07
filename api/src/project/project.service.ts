import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';
import { MemberService } from '../member/member.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    private readonly memberService: MemberService,
  ) {}

  async create(ownerId: number, name: string): Promise<Project> {
    const owner = await this.userService.findOneById(ownerId);
    const project = this.projectRepository.create({
      owner,
      name,
      boards: [],
      members: [],
    });
    const savedProject = await this.projectRepository.save(project);

    this.logger.debug(
      `Created project: ${JSON.stringify(savedProject, null, 2)}`,
    );

    await this.memberService.create(owner, project); // ignore result member

    return this.get(savedProject.id, ownerId);
  }

  async getAll(userId: number): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      relations: { owner: true, members: true, boards: true },
      where: { members: { user: { id: userId } } },
    });
    this.logger.debug(
      `Getting all projects: ${JSON.stringify(projects, null, 2)}`,
    );
    return projects;
  }

  async get(id: number, userId: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      relations: { owner: true, members: true, boards: true },
      where: { id, members: { user: { id: userId } } },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    this.logger.debug(
      `Getting project with id=${id}: ${JSON.stringify(project, null, 2)}`,
    );
    return project;
  }
}
