import {
  IsArray,
  IsDateString,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class TaskDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsInt()
  // parentId: number;  // TODO:

  @IsInt()
  @IsNotEmpty()
  boardId: number;

  @IsInt()
  @IsNotEmpty()
  ownerId: number;

  @IsArray()
  @IsNotEmpty()
  performerIds: number[];

  @IsHexColor()
  @IsNotEmpty()
  color: string;

  @IsDateString()
  @IsNotEmpty()
  plannedStartAt: Date;

  @IsDateString()
  @IsNotEmpty()
  plannedEndAt: Date;

  @IsDateString()
  actuallyStartAt?: Date;

  @IsDateString()
  actuallyEndAt?: Date;
}
