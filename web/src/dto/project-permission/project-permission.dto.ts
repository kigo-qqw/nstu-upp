import { ProjectPermissionType } from "~/enum";

export interface ProjectPermissionDto {
  id: number;
  userId: number;
  projectId: number;
  type: ProjectPermissionType[];
}
