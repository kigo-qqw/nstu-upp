import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskMapper } from './task.mapper';
import { CurrentUser } from '../auth/decorators';
import { User } from '../user/entity/user.entity';
import { UpdateUserDto } from '../user/dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @CurrentUser() user: User,
  ): Promise<TaskDto> {
    console.log(createTaskDto);
    createTaskDto.plannedStartAt = new Date(createTaskDto.plannedStartAt);
    createTaskDto.plannedEndAt = new Date(createTaskDto.plannedEndAt);

    return TaskMapper.toDto(
      await this.taskService.create(user.id, createTaskDto),
    );
  }

  @Get('/all/:boardId')
  async getAll(
    @Param('boardId') boardId: number,
    @CurrentUser() user: User,
  ): Promise<TaskDto[]> {
    return (await this.taskService.getAll(boardId, user.id)).map((task) =>
      TaskMapper.toDto(task),
    );
  }

  @Get('/:taskId')
  async get(
    @Param('taskId') taskId: number,
    @CurrentUser() user: User,
  ): Promise<TaskDto> {
    return TaskMapper.toDto(await this.taskService.get(user.id, taskId));
  }

  @Put('/:taskId')
  async update(
    @Param('taskId') taskId: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: User,
  ): Promise<TaskDto> {
    return TaskMapper.toDto(
      await this.taskService.update(user.id, taskId, updateTaskDto),
    );
  }
}
