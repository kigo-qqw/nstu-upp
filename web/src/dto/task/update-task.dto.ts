export interface UpdateTaskDto {
  id: number;
  title: string;
  description: string;
  // parentId: number; // TODO
  boardId: number;
  ownerId: number;
  performerIds: number[];
  color: string;
  plannedStartAt: Date;
  plannedEndAt: Date;
  actuallyStartAt?: Date;
  actuallyEndAt?: Date;
}
