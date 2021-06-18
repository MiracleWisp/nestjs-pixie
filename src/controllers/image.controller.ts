import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { Readable } from 'stream';
import { Response } from 'express';

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
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
