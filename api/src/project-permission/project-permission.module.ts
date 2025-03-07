import { Module } from '@nestjs/common';
import { ProjectPermissionService } from './project-permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPermission } from './entity/project-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectPermission])],
  providers: [ProjectPermissionService],
  exports: [ProjectPermissionService],
})
export class ProjectPermissionModule {}
