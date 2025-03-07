import { PublicUserDto } from "~/dto/auth/public-user.dto";

export interface ProjectDto {
  id: number;
  name: string;
  owner: PublicUserDto;
  memberIds: number[];
  boardIds: number[];
}
