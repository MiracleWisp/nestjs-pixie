import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { Readable } from 'stream';
import { Response } from 'express';
import { ImageNotFoundError } from '../exceptions/image-not-found.error';
import { SizeNotAllowedError } from '../exceptions/size-not-allowed.error';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get(`:id`)
  private async getImage(
    @Res() response: Response,
    @Param('id') id: string,
    @Query('width') width: string,
    @Query('height') height: string,
  ): Promise<void> {
    const size =
      width || height
        ? {
            width: width ? parseInt(width) : null,
            height: height ? parseInt(height) : null,
          }
        : undefined;
    try {
      const image: Readable = await this.imageService.getImage(id, size);
      image.pipe(response);
    } catch (err) {
      if (err instanceof ImageNotFoundError) {
        throw new NotFoundException(err.message);
      } else if (err instanceof SizeNotAllowedError) {
        throw new ForbiddenException(err.message);
      }
    }
    return;
  }
}
