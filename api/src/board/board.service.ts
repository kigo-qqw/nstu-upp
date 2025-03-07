import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { Repository } from 'typeorm';
import { ProjectPermissionService } from '../project-permission/project-permission.service';
import { MemberService } from '../member/member.service';
import { ProjectPermissionType } from '../project-permission/entity/project-permission.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly projectPermissionService: ProjectPermissionService,
    private readonly memberService: MemberService,
  ) {}

  async create(
    projectId: number,
    userId: number,
    name: string,
  ): Promise<Board> {
    const member = await this.memberService.get(userId, projectId);
    // if (
    //   !(await this.projectPermissionService.havePermission(
    //     member,
    //     ProjectPermissionType.CREATE_BOARD,
    //   ))
    // ) {
    //   throw new ForbiddenException(
    //     `You do not have permission to create board.`,
    //   );
    // }

    const board = this.boardRepository.create({
      name,
      project: member.project,
      tasks: [],
    });
    return await this.boardRepository.save(board);
  }

  async getAll(projectId: number, userId: number): Promise<Board[]> {
    try {
      // await this.memberService.get(userId, projectId);
      return await this.boardRepository.find({
        relations: { project: true, tasks: true },
        where: { project: { id: projectId } },
      });
    } catch {
      throw new ForbiddenException(
        `You do not have permission to get boards of project with id ${projectId}.`,
      );
    }
  }

  async get(userId: number, boardId: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      relations: { project: true, tasks: true },
      where: { id: boardId },
    });
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`);
    }

    try {
      // await this.memberService.get(userId, board.project.id);

      return board;
    } catch {
      throw new ForbiddenException(
        `You do not have permission to get board with id ${boardId}.`,
      );
    }
  }
}
