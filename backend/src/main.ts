import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // permitir requests desde front
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
