import { Logger, Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entity/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { MemberModule } from '../member/member.module';
import { ProjectPermissionModule } from '../project-permission/project-permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UserModule,
    MemberModule,
    ProjectPermissionModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, Logger],
})
export class ProjectModule {}
