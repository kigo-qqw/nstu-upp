import { ApiService } from "~/services/api.service";
import { useProjectStore } from "~/store/project.store";
import { storeToRefs } from "pinia";
import type { ProjectDto, CreateProjectDto } from "~/dto/project";
import userService from "./user.service";
import boardService from "./board.service";
import { Project } from "~/entity";

const apiService = new ApiService("project", "http://localhost:3000"); // TODO: env??

export class ProjectService {
  private async storeProject(project: Project) {
    const projectStore = useProjectStore();
    const { setProject } = projectStore;

    setProject(project.id, project);

    console.log("project", project);

    return (
      (await userService.getById(project.ownerId)) &&
      project.memberIds.every(
        async (memberId) => await userService.getById(memberId),
      ) &&
      project.boardIds.every(async (boardId) => await boardService.get(boardId))
    );
  }

  async create(createProjectDto: CreateProjectDto) {
    const projectStore = useProjectStore();
    const { isLoading } = storeToRefs(projectStore);

    isLoading.value = true;
    try {
      const response = await apiService.post<CreateProjectDto, ProjectDto>(
        "",
        createProjectDto,
      );

      return await this.storeProject({
        ...response,
        ownerId: response.owner.id,
      });
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async get(id: number) {
    const projectStore = useProjectStore();
    const { isLoading } = storeToRefs(projectStore);

    isLoading.value = true;
    try {
      const response = await apiService.get<ProjectDto>("", { id });

      return await this.storeProject({
        ...response,
        ownerId: response.owner.id,
      });
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async getAll() {
    const projectStore = useProjectStore();
    const { isLoading } = storeToRefs(projectStore);

    isLoading.value = true;
    try {
      const response = await apiService.get<ProjectDto[]>("");

      return response.every(
        async (projectDto) =>
          await this.storeProject({
            ...projectDto,
            ownerId: projectDto.owner.id,
          }),
      );
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      console.log("isLoading.value = false");
      isLoading.value = false;
    }
  }
}

export default new ProjectService();
