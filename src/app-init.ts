import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import { Request, Response, NextFunction } from 'express';
import { AllExceptionsFilter } from './common/exception/all-exceptions.filter';
import { RequestContext } from './request-context';

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

  // custom request context
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.context = new RequestContext(req, res);
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    // 'express-basic-auth' for swagger
    // TODO: 환경 변수 관리 전략 수립 후 적용
    const user = process.env.SWAGGER_USER || 'qwer';
    const password = process.env.SWAGGER_PASSWORD || 'qwer';
    app.use(
      ['/swagger'],
      expressBasicAuth({
        challenge: true,
        users: {
          [user]: password,
        },
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
    console.info('Swagger URL: http://localhost:3000/swagger');

    // apollo studio
    app.enableCors({
      credentials: true,
      allowedHeaders:
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      exposedHeaders: 'Authorization',
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1',
        'https://studio.apollographql.com',
      ],
    });
  }
}
