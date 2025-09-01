import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function setupApp(
  app: NestExpressApplication,
): Promise<void> {

  // pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('백엔드 구현 과제 eh.kim')
    .setDescription('팬마음 투표 페이지 백엔드 API 구현 과제')
    .setVersion('0.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
}
