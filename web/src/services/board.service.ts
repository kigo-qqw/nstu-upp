import { ApiService } from "~/services/api.service";
import { storeToRefs } from "pinia";
import type { CreateBoardDto, BoardDto } from "~/dto/board";
import { useBoardStore } from "~/store/board.store";

const apiService = new ApiService("board", "http://localhost:3000"); // TODO: env??

export class BoardService {
  async create(createBoardDto: CreateBoardDto) {
    const boardStore = useBoardStore();
    const { isLoading } = storeToRefs(boardStore);
    const { setBoard } = boardStore;

    isLoading.value = true;
    try {
      const response = await apiService.post<CreateBoardDto, BoardDto>(
        "",
        createBoardDto,
      );
      setBoard(response.id, { ...response });

      return true;
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async get(id: number) {
    const boardStore = useBoardStore();
    const { isLoading } = storeToRefs(boardStore);
    const { setBoard } = boardStore;

    isLoading.value = true;

    try {
      const response = await apiService.get<BoardDto>(`${id}`);
      setBoard(response.id, { ...response });

      return true;
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async getAll(projectId: number) {
    const boardStore = useBoardStore();
    const { isLoading } = storeToRefs(boardStore);
    const { setBoard } = boardStore;

    isLoading.value = true;
    try {
      const response = await apiService.get<BoardDto[]>(`all/${projectId}`);
      response.forEach((b) => {
        setBoard(b.id, { ...b });
      });

      return true;
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new BoardService();
