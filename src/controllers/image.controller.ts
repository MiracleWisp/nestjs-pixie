import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from '../services/image.service';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get(':id')
  private getImage(
    @Res() response: Response,
    @Param('id') id: string,
    @Query('width') width: string,
    @Query('height') height: string,
  ): void {
    const size =
      width && height
        ? {
            width: parseInt(width),
            height: parseInt(height),
          }
        : undefined;
    this.imageService
      .getImage(id, size)
      .then((imageStream) => {
        imageStream.pipe(response);
      })
      .catch(() => {
        response.sendStatus(404);
      });
  }
}
