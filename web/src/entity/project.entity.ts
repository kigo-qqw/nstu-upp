export interface Project {
  id: number;
  name: string;
  ownerId: number;
  memberIds: number[];
  boardIds: number[];
}
