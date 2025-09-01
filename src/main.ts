import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupApp } from './app-init';

BigInt.prototype['toJSON'] = function (): string {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set up app
  await setupApp(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
