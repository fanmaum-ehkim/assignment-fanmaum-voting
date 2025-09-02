import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/exception/all-exceptions.filter';

export async function setupApp(
  app: NestExpressApplication,
): Promise<void> {

  // TODO: filter, pipe 적용 순서 관련 문제 발생 가능성 검토
  // filter
  const httpAdapter = app.getHttpAdapter();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

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
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  if (process.env.NODE_ENV !== 'production') {
    console.info('Swagger URL: http://localhost:3000/swagger');
  }
}
