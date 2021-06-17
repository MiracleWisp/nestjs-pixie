import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from '../services/image.service';
import { Readable } from 'stream';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get(':id')
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
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
