import { ApiService } from "~/services/api.service";
import { storeToRefs } from "pinia";
import type { CreateBoardDto, BoardDto } from "~/dto/board";
import { useBoardStore } from "~/store";
import { Board } from "~/entity";
import taskService from "~/services/task.service";

const apiService = new ApiService("board", "http://localhost:3000"); // TODO: env??

export class BoardService {
  private async storeBoard(board: Board) {
    const boardStore = useBoardStore();
    const { setBoard } = boardStore;
    setBoard(board.id, board);

    return board.taskIds.every(async (taskId) => await taskService.get(taskId));
  }

  async create(createBoardDto: CreateBoardDto) {
    const boardStore = useBoardStore();
    const { isLoading } = storeToRefs(boardStore);

    isLoading.value = true;
    try {
      const response = await apiService.post<CreateBoardDto, BoardDto>(
        "",
        createBoardDto,
      );
      return this.storeBoard({ ...response });
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async get(id: number) {
    const boardStore = useBoardStore();
    const { isLoading } = storeToRefs(boardStore);

    isLoading.value = true;

    try {
      const response = await apiService.get<BoardDto>(`${id}`);
      return this.storeBoard({ ...response });
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async getAll(projectId: number) {
    const boardStore = useBoardStore();
    const { isLoading } = storeToRefs(boardStore);

    isLoading.value = true;
    try {
      const response = await apiService.get<BoardDto[]>(`all/${projectId}`);
      return response.forEach((b) => this.storeBoard({ ...b }));
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new BoardService();
