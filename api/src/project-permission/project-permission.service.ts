import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectPermission } from './entity/project-permission.entity';
import { Member } from '../member/entity/member.entity';
import { MemberService } from '../member/member.service';
import { ProjectPermissionType } from './enum';

@Injectable()
export class ProjectPermissionService {
  constructor(
    @InjectRepository(ProjectPermission)
    private readonly projectPermissionRepository: Repository<ProjectPermission>,
    private readonly memberService: MemberService,
    private readonly logger: Logger,
  ) {}

  async create(member: Member): Promise<ProjectPermission> {
    const permissions = this.projectPermissionRepository.create({
      member,
      type: [],
    });
    return this.projectPermissionRepository.save(permissions);
  }

  async addPermissionWithoutInitiator(
    target: Member,
    types: ProjectPermissionType[],
  ): Promise<ProjectPermission> {
    let permissions: ProjectPermission;

    this.logger.debug(target);

    try {
      permissions = await this.findForMember(target);
    } catch (e) {
      this.logger.error(e);
      permissions = await this.create(target);
    }
    permissions.type.push(...types);

    this.logger.debug(permissions);
    return await this.projectPermissionRepository.save(permissions);
  }

  async addPermission(
    initiator: Member,
    target: Member,
    types: ProjectPermissionType[],
  ): Promise<ProjectPermission> {
    if (
      await this.havePermission(
        initiator,
        ProjectPermissionType.MANAGE_PERMISSIONS,
      )
    ) {
      return this.addPermissionWithoutInitiator(target, types);
    } else throw new ForbiddenException(`No permissions to add permission`);
  }

  async findForMember(member: Member): Promise<ProjectPermission> {
    const permissions = await this.projectPermissionRepository.findOne({
      relations: { member: { user: true, project: true } },
      where: {
        member: {
          user: { id: member.user.id },
          project: { id: member.project.id },
        },
      },
    });

    this.logger.debug(permissions);

    if (!permissions) {
      throw new NotFoundException(
        `Project permission for member with userId=${member.user.id} projectId=${member.project.id} not found`,
      );
    }

    return permissions;
  }

  async canAccessProject(projectId: number, userId: number): Promise<boolean> {
    try {
      await this.memberService.get(userId, projectId);
      return true;
    } catch {
      return false;
    }
  }

  async havePermission(
    member: Member,
    type: ProjectPermissionType,
  ): Promise<boolean> {
    try {
      const permissions = await this.findForMember(member);
      return permissions.type.includes(type);
    } catch {
      return false;
    }
  }
}
