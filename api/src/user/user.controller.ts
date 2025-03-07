import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { UserMapper } from './user.mapper';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return UserMapper.toDto(await this.userService.create(createUserDto));
  }

  @Get()
  async getAll(): Promise<UserDto[]> {
    return (await this.userService.findAll()).map((user) =>
      UserMapper.toDto(user),
    );
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return UserMapper.toDto(await this.userService.findOneById(id));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }
}
