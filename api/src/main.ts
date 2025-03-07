import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('nstu-upp docs')
    .setDescription('The nstu-upp OpenAPI documentation')
    .setVersion(process.env.npm_package_version ?? 'unknown')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(AppModule.port);

  return AppModule;
};

bootstrap().then((appModule: typeof AppModule) => {
  Logger.log(`Application running on port: ${appModule.port}`, 'Main');
});
