import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { ResizeImageService } from './services/resize-image.service';
import { ImageDao } from './dao/image.dao';
import { LocalStorageImageDao } from './dao/local-storage-image.dao';
import { ImageService } from './services/image.service';

@Module({
  controllers: [ImageController],
  providers: [
    ResizeImageService,
    ImageService,
    {
      provide: ImageDao,
      useClass: LocalStorageImageDao,
    },
  ],
})
export class PixieModule {}
