import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const defaultConnection = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',

    host: configService.get<string>('TYPEORM_HOST')!,
    port: configService.get<number>('TYPEORM_PORT'),
    username: configService.get<string>('TYPEORM_USERNAME')!,
    password: configService.get<string>('TYPEORM_PASSWORD')!,
    database: configService.get<string>('TYPEORM_DATABASE')!,

    logging: configService.get<string>('TYPEORM_LOGGING') === 'true',

    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  };
};

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: defaultConnection,
    inject: [ConfigService],
  }),
];
