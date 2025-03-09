import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BoardPermissionService } from './board-permission/board-permission.service';
import { ProjectPermissionModule } from './project-permission/project-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UserModule,
    ProjectModule,
    BoardModule,
    CommentModule,
    TaskModule,
    AuthModule,
    ProjectPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService, BoardPermissionService],
})
export class AppModule {
  public static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = configService.get<number>('API_PORT')!;
  }
}
