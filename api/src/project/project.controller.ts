import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { ProjectDto, CreateProjectDto, InviteUserDto } from './dto';
import { CurrentUser } from '../auth/decorators';
import { User } from '../user/entity/user.entity';
import { ProjectMapper } from './project.mapper';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: User,
  ): Promise<ProjectDto> {
    return ProjectMapper.toDto(
      await this.projectService.create(user.id, createProjectDto.projectName),
    );
  }

  @Get()
  async getAll(@CurrentUser() user: User): Promise<ProjectDto[]> {
    return (await this.projectService.getAll(user.id)).map((p) =>
      ProjectMapper.toDto(p),
    );
  }

  @Get(':id')
  async get(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<ProjectDto> {
    return ProjectMapper.toDto(await this.projectService.get(id, user.id));
  }

  @Post('/invite')
  async invite(
    @Body(ValidationPipe) inviteUserDto: InviteUserDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.projectService.invite(
      user,
      inviteUserDto.projectId,
      inviteUserDto.userEmail,
    );
  }
}
