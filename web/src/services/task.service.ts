import { ApiService } from "~/services/api.service";
import { CreateTaskDto, TaskDto, UpdateTaskDto } from "~/dto/task";
import { useTaskStore } from "~/store";
import { storeToRefs } from "pinia";
import { Task } from "~/entity";

const apiService = new ApiService("task", "http://localhost:3000"); // TODO: env??

export class TaskService {
  private async storeTask(taskDto: TaskDto) {
    const taskStore = useTaskStore();
    const { setTask } = taskStore;

    const task: Task = {
      ...taskDto,
      plannedStartAt: new Date(taskDto.plannedStartAt),
      plannedEndAt: new Date(taskDto.plannedEndAt),
      actuallyStartAt: taskDto.actuallyStartAt
        ? new Date(taskDto.actuallyStartAt)
        : undefined,
      actuallyEndAt: taskDto.actuallyEndAt
        ? new Date(taskDto.actuallyEndAt)
        : undefined,
    };

    setTask(task.id, task);
    return true;
  }

  async create(createTaskDto: CreateTaskDto) {
    const taskStore = useTaskStore();
    const { isLoading } = storeToRefs(taskStore);

    isLoading.value = true;
    try {
      const response = await apiService.post<CreateTaskDto, TaskDto>(
        "",
        createTaskDto,
      );
      return this.storeTask({ ...response });
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async get(id: number) {
    console.log("TaskService::get ", id);
    const taskStore = useTaskStore();
    const { isLoading } = storeToRefs(taskStore);

    isLoading.value = true;
    try {
      const response = await apiService.get<TaskDto>(`${id}`);
      return this.storeTask({ ...response });
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async getAll(boardId: number) {
    const taskStore = useTaskStore();
    const { isLoading } = storeToRefs(taskStore);

    isLoading.value = true;
    try {
      const response = await apiService.get<TaskDto[]>(`all/${boardId}`);
      return response.forEach((b) => this.storeTask({ ...b }));
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log("TaskService::update ", id, updateTaskDto);
    const taskStore = useTaskStore();
    const { isLoading } = storeToRefs(taskStore);

    isLoading.value = true;
    try {
      const response = await apiService.put<UpdateTaskDto, TaskDto>(
        `${id}`,
        updateTaskDto,
      );
      return this.storeTask({ ...response });
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new TaskService();
