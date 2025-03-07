export interface CreateTaskDto {
  title: string;
  description: string;
  // parentId: number; // TODO
  boardId: number;
  ownerId: number;
  startDate: number;
  endDate: number;
  performerIds: number[];
}
