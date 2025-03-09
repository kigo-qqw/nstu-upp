import { TaskDto } from './dto/task.dto';
import { Task } from './entity/task.entity';

export class TaskMapper {
  public static toDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      ownerId: task.owner.id,
      boardId: task.board.id,
      performerIds: task.performers.map((p) => p.user.id),
      color: task.color,
      plannedStartAt: task.plannedStartAt,
      plannedEndAt: task.plannedEndAt,
      actuallyStartAt: task.actuallyStartAt,
      actuallyEndAt: task.actuallyEndAt,
    };
  }
}
