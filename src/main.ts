import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { Logger } from "nestjs-pino";
import { ValidationPipe } from "@nestjs/common";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
