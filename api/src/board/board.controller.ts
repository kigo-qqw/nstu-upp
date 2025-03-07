import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto, BoardDto } from './dto';
import { BoardService } from './board.service';
import { CurrentUser } from '../auth/decorators';
import { User } from '../user/entity/user.entity';
import { BoardMapper } from './board.mapper';

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createBoardDto: CreateBoardDto,
    @CurrentUser() user: User,
  ): Promise<BoardDto> {
    return BoardMapper.toDto(
      await this.boardService.create(
        createBoardDto.projectId,
        user.id,
        createBoardDto.name,
      ),
    );
  }

  @Get('/all/:projectId')
  async getAll(
    @Param('projectId') projectId: number,
    @CurrentUser() user: User,
  ): Promise<BoardDto[]> {
    return (await this.boardService.getAll(projectId, user.id)).map((b) =>
      BoardMapper.toDto(b),
    );
  }

  @Get(':boardId')
  async get(
    @Param('boardId') boardId: number,
    @CurrentUser() user: User,
  ): Promise<BoardDto> {
    return BoardMapper.toDto(await this.boardService.get(user.id, boardId));
  }
}
