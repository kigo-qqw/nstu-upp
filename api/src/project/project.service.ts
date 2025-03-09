import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';
import { MemberService } from '../member/member.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { ProjectPermissionService } from '../project-permission/project-permission.service';
import { ProjectPermissionType } from '../project-permission/enum';

@Injectable()
export class ProjectService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    private readonly memberService: MemberService,
    private readonly projectPermissionService: ProjectPermissionService,
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

    const ownerMember = await this.memberService.create(owner, project); // ignore result member

    await this.projectPermissionService.addPermissionWithoutInitiator(
      ownerMember,
      [
        ProjectPermissionType.CREATE_BOARD,
        ProjectPermissionType.INVITE_USER,
        ProjectPermissionType.MANAGE_PERMISSIONS,
      ],
    );
    return this.get(savedProject.id, ownerId);
  }

  async getAll(userId: number): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      // relations: { owner: true, members: true, boards: true },
      where: { members: { user: { id: userId } } },
    });

    const fullProjects = await Promise.all(
      projects.map(async (p) => {
        const project = await this.projectRepository.findOne({
          relations: {
            owner: true,
            members: { user: true, project: true },
            boards: true,
          },
          where: { id: p.id },
        });
        if (!project) {
          throw new NotFoundException(`Project with id ${p.id} not found`);
        }
        return project;
      }),
    );

    this.logger.debug(
      `Getting all projects: ${JSON.stringify(fullProjects, null, 2)}`,
    );
    return fullProjects;
  }

  async get(id: number, userId: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      relations: {
        owner: true,
        members: { user: true, project: true },
        boards: true,
      },
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

  async invite(
    inviter: User,
    projectId: number,
    userEmail: string,
  ): Promise<boolean> {
    try {
      const member = await this.memberService.get(inviter.id, projectId);

      if (
        await this.projectPermissionService.havePermission(
          member,
          ProjectPermissionType.INVITE_USER,
        )
      ) {
        const user = await this.userService.findOneByEmail(userEmail);
        const project = await this.get(projectId, inviter.id);
        await this.memberService.create(user, project);

        return true;
      } else return false;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
