import { NestFactory } from '@nestjs/core';
import { PixieModule } from './pixie.module';

async function bootstrap() {
  const app = await NestFactory.create(PixieModule);
  await app.listen(3000);
}
bootstrap();
