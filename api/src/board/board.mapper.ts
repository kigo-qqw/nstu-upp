import { Board } from './entity/board.entity';
import { BoardDto } from './dto';

export class BoardMapper {
  public static toDto(board: Board): BoardDto {
    console.log(board);
    return {
      id: board.id,
      name: board.name,
      projectId: board.project.id,
      taskIds: board.tasks.map((task) => task.id),
    };
  }
}
