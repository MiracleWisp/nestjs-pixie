import { DynamicModule, Module } from '@nestjs/common';
import { ResizeImageService } from './services/resize-image.service';
import { ImageDao } from './dao/image.dao';
import { LocalStorageImageDao } from './dao/local-storage-image.dao';
import { ImageService } from './services/image.service';
import { PixieOptions } from './types/pixie-options';
import { ImageController } from './controllers/image.controller';
import { PATH_METADATA } from '@nestjs/common/constants';

@Module({})
export class PixieModule {
  static register(options: PixieOptions): DynamicModule {
    return {
      module: PixieModule,
      controllers: [ImageController],
      providers: [
        ResizeImageService,
        ImageService,
        {
          provide: ImageDao,
          useClass: LocalStorageImageDao,
        },
        {
          provide: 'CONFIG',
          useValue: options,
        },
        {
          provide: Symbol('CONTROLLER_HACK'),
          useFactory: (config: PixieOptions) => {
            const controllerPrefix = config.prefix || 'image';

            Reflect.defineMetadata(
              PATH_METADATA,
              controllerPrefix,
              ImageController,
            );
          },
          inject: ['CONFIG'],
        },
      ],
    };
  }
}
