import { IsInt, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsInt() projectId: number;
  @IsString() name: string;
}
