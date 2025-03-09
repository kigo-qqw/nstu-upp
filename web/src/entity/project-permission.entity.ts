import { ProjectPermissionType } from "~/enum";

export interface ProjectPermission {
  id: number;
  userId: number;
  projectId: number;
  type: ProjectPermissionType[];
}
