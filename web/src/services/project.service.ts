import { ApiService } from "~/services/api.service";
import { useProjectStore } from "~/store/project.store";
import { storeToRefs } from "pinia";
import type {
  ProjectDto,
  CreateProjectDto,
  InviteUserDto,
} from "~/dto/project";
import userService from "./user.service";
import projectPermissionService from "./project-permission.service";
import boardService from "./board.service";
import { Project } from "~/entity";
import { SERVER_URL } from "~/constants";

const apiService = new ApiService("project", SERVER_URL);

export class ProjectService {
  private async storeProject(project: Project) {
    const projectStore = useProjectStore();
    const { setProject } = projectStore;

    setProject(project.id, project);

    return (
      (await userService.getById(project.ownerId)) &&
      project.memberIds.every(
        async (memberId) =>
          (await userService.getById(memberId)) &&
          (await projectPermissionService.get(memberId, project.id)),
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
      console.log(e);
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
      const response = await apiService.get<ProjectDto>(`${id}`);

      return await this.storeProject({
        ...response,
        ownerId: response.owner.id,
      });
    } catch (e) {
      console.log(e);
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
      console.error(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async invite(inviteUserDto: InviteUserDto) {
    const projectStore = useProjectStore();
    const { isLoading } = storeToRefs(projectStore);

    isLoading.value = true;
    try {
      const response = await apiService.post<InviteUserDto, boolean>(
        "invite",
        inviteUserDto,
      );

      return response && (await this.get(inviteUserDto.projectId));
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new ProjectService();
