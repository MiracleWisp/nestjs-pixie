import { NestFactory } from '@nestjs/core';
import { PixieModule } from './pixie.module';

async function bootstrap() {
  const app = await NestFactory.create(
    PixieModule.register({
      prefix: 'pixie',
      whitelist: [
        {
          width: 256,
          height: 256,
        },
        {
          width: 64,
          height: 64,
        },
      ],
    }),
  );
  await app.listen(3000);
}

bootstrap();
