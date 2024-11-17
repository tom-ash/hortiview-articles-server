import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Temporary lenient implementation for development purposes.
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Optional: Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Optional: Specify allowed headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
