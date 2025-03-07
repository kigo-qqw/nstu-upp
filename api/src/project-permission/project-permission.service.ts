import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ProjectPermission,
  ProjectPermissionType,
} from './entity/project-permission.entity';
import { Member } from '../member/entity/member.entity';

@Injectable()
export class ProjectPermissionService {
  constructor(
    @InjectRepository(ProjectPermission)
    private readonly projectPermissionRepository: Repository<ProjectPermission>,
  ) {}

  async create(member: Member): Promise<ProjectPermission> {
    const permissions = this.projectPermissionRepository.create({
      member,
      type: [],
    });
    return this.projectPermissionRepository.save(permissions);
  }

  async findForMember(member: Member): Promise<ProjectPermission> {
    const permissions = await this.projectPermissionRepository.findOne({
      where: {
        member: {
          user: { id: member.user.id },
          project: { id: member.project.id },
        },
      },
    });

    if (!permissions) {
      throw new NotFoundException(`Project permission for ${member} not found`);
    }

    return permissions;
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
