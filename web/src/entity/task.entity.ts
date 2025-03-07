export interface Task {
  id: number;
  title: string;
  description: string;
  parentId: number;
  boardId: number;
  ownerId: number;
  startDate: number;
  endDate: number;
  performerIds: number[];
}
