import { NestFactory } from '@nestjs/core';
import { PixieModule } from './pixie.module';

async function bootstrap() {
  const app = await NestFactory.create(PixieModule.register('pixie'));
  await app.listen(3000);
}

bootstrap();
