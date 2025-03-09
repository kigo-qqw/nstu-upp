import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { BoardService } from '../board/board.service';
import { MemberService } from '../member/member.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly boardService: BoardService,
    private readonly memberService: MemberService,
    private readonly logger: Logger,
  ) {}

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.debug(
      `TaskService::create(userId=${userId}, createTaskDto=${JSON.stringify(createTaskDto)})`,
    );

    const board = await this.boardService.get(userId, createTaskDto.boardId);

    this.logger.debug(`Board: ${JSON.stringify(board)}`);

    const owner = await this.memberService.get(userId, board.project.id);

    this.logger.debug(`Owner: ${JSON.stringify(owner)}`);

    const performers = await Promise.all(
      createTaskDto.performerIds.map(
        async (performerId) =>
          await this.memberService.get(performerId, board.project.id),
      ),
    );

    this.logger.debug(`Performers: ${JSON.stringify(performers)}`);

    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      owner: owner,
      board: board,
      performers: performers,
      color: createTaskDto.color,
      plannedStartAt: createTaskDto.plannedStartAt,
      plannedEndAt: createTaskDto.plannedEndAt,
    });

    this.logger.debug(`Task: ${JSON.stringify(task)}`);

    return await this.taskRepository.save(task);
  }

  async getAll(boardId: number, userId: number): Promise<Task[]> {
    this.logger.debug(
      `TaskService::getAll(boardId=${boardId}, userId=${userId})`,
    );
    try {
      // TODO: permission check
      return await this.taskRepository.find({
        relations: { parent: true, board: true, owner: true, performers: true },
        where: { board: { id: boardId } },
      });
    } catch (e) {
      this.logger.error(e);
      throw new ForbiddenException(
        `You do not have permission to get tasks of board with id ${boardId}.`,
      );
    }
  }

  async get(userId: number, taskId: number): Promise<Task> {
    this.logger.debug(`TaskService::get(userId=${userId}, taskId=${taskId})`);
    const task = await this.taskRepository.findOne({
      relations: {
        parent: true,
        board: { project: true },
        owner: true,
        performers: { user: true, project: true },
      },
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    try {
      await this.memberService.get(userId, task.board.project.id);

      return task;
    } catch (e) {
      this.logger.error(e);
      throw new ForbiddenException(
        `You do not have permission to get task with id ${taskId}.`,
      );
    }
  }

  async update(
    userId: number,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    this.logger.debug(updateTaskDto);

    const task = await this.taskRepository.findOne({
      relations: { board: { project: true } },
      where: { id: taskId },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    const board = await this.boardService.get(userId, task.board.id);
    task.board = board;
    task.owner = await this.memberService.get(
      updateTaskDto.ownerId,
      board.project.id,
    );
    this.logger.debug('update');
    this.logger.debug(updateTaskDto.performerIds);

    task.performers = await Promise.all(
      updateTaskDto.performerIds
        .filter((value, index, array) => array.indexOf(value) === index)
        .map(
          async (pid) => await this.memberService.get(pid, board.project.id),
        ),
    );

    this.logger.debug(task.performers);

    task.color = updateTaskDto.color;

    task.plannedStartAt = updateTaskDto.plannedStartAt;
    task.plannedEndAt = updateTaskDto.plannedEndAt;
    task.actuallyStartAt = updateTaskDto.actuallyStartAt;
    task.actuallyEndAt = updateTaskDto.actuallyEndAt;

    return await this.taskRepository.save(task);
  }
}
