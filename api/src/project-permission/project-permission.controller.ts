import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators';
import { User } from '../user/entity/user.entity';
import { ProjectPermissionDto } from './dto';
import { ProjectPermissionMapper } from './project-permission.mapper';
import { MemberService } from '../member/member.service';
import { ProjectPermissionService } from './project-permission.service';

@Controller('project-permission')
export class ProjectPermissionController {
  constructor(
    private readonly projectPermissionService: ProjectPermissionService,
    private readonly memberService: MemberService,
  ) {}

  @Get()
  async get(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('projectId', ParseIntPipe) projectId: number,
    @CurrentUser() user: User,
  ): Promise<ProjectPermissionDto> {
    const member = await this.memberService.get(userId, projectId);

    console.log('ProjectPermissionController::get', userId, projectId);
    return ProjectPermissionMapper.toDto(
      await this.projectPermissionService.findForMember(member),
    );
  }
}
