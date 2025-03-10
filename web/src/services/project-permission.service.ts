import { ApiService } from "~/services/api.service";
import { useProjectPermissionStore } from "~/store";
import { storeToRefs } from "pinia";
import type { ProjectPermissionDto } from "~/dto/project-permission";
import { ProjectPermission } from "~/entity";
import { SERVER_URL } from "~/constants";

const apiService = new ApiService("project-permission", SERVER_URL);

export class ProjectPermissionService {
  private async storeProjectPermission(permission: ProjectPermission) {
    const projectPermissionStore = useProjectPermissionStore();
    const { setProjectPermission } = projectPermissionStore;

    setProjectPermission(permission.id, permission);
  }

  async get(projectId: number, userId: number) {
    const projectPermissionStore = useProjectPermissionStore();
    const { isLoading } = storeToRefs(projectPermissionStore);

    isLoading.value = true;
    try {
      const response = await apiService.get<ProjectPermissionDto>("", {
        userId,
        projectId,
      });

      return await this.storeProjectPermission({
        ...response,
      });
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new ProjectPermissionService();
