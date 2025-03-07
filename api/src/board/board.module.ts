import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPermissionModule } from '../project-permission/project-permission.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    ProjectPermissionModule,
    MemberModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
