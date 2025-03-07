import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { MemberModule } from './member/member.module';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';
import { ProjectPermissionModule } from './project-permission/project-permission.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   username: 'nstu_upp', // TODO: ConfigService
    //   password: 'nstu_upp',
    //   database: 'nstu_upp',
    //   host: 'localhost',
    //   port: 5432,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    DatabaseModule,
    UserModule,
    ProjectModule,
    BoardModule,
    CommentModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = configService.get<number>('API_PORT')!;
  }
}
