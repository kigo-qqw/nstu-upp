import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BoardDto {
  @IsInt() @IsNotEmpty() id: number;
  @IsString() @IsNotEmpty() name: string;
  @IsInt() @IsNotEmpty() projectId: number;
  @IsInt() @IsNotEmpty() taskIds: number[];
}
