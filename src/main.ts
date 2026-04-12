import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InfoValidationPipe } from './pipes/info-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ transform: true }),
    // new InfoValidationPipe()
  );

  const config = new DocumentBuilder()
    .setTitle('Ремонт стиральных машин')
    .setDescription('Документация по REST API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
