import {
  Controller,
  DynamicModule,
  Get,
  HttpException,
  HttpStatus,
  Module,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { ResizeImageService } from './services/resize-image.service';
import { ImageDao } from './dao/image.dao';
import { LocalStorageImageDao } from './dao/local-storage-image.dao';
import { ImageService } from './services/image.service';
import { Response } from 'express';
import { Readable } from 'stream';

@Module({})
export class PixieModule {
  static register(prefix): DynamicModule {
    @Controller(prefix)
    class ImageController {
      constructor(private imageService: ImageService) {}

      @Get(`:id`)
      private async getImage(
        @Res() response: Response,
        @Param('id') id: string,
        @Query('width') width: string,
        @Query('height') height: string,
      ): Promise<void> {
        const size =
          width && height
            ? {
                width: parseInt(width),
                height: parseInt(height),
              }
            : undefined;
        try {
          const image: Readable = await this.imageService.getImage(id, size);
          image.pipe(response);
        } catch (err) {
          console.log(err);
          throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        return;
      }
    }

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
      ],
    };
  }
}
