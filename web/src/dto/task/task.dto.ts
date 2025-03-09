export interface TaskDto {
  id: number;
  title: string;
  description: string;
  // parentId?: number;  // TODO:
  boardId: number;
  ownerId: number;
  performerIds: number[];
  color:string;
  plannedStartAt: string;
  plannedEndAt: string;
  actuallyStartAt?: string;
  actuallyEndAt?: string;
}
