import { Logger, Module } from '@nestjs/common';
import { ProjectPermissionService } from './project-permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPermission } from './entity/project-permission.entity';
import { MemberModule } from '../member/member.module';
import { ProjectPermissionController } from './project-permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectPermission]), MemberModule],
  controllers: [ProjectPermissionController],
  providers: [ProjectPermissionService, Logger],
  exports: [ProjectPermissionService],
})
export class ProjectPermissionModule {}
