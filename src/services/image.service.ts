import { ImageSize } from '../types/image-size';
import { ImageDao } from '../dao/image.dao';
import { ResizeImageService } from './resize-image.service';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class ImageService {
  constructor(
    private imageDao: ImageDao,
    private resizeImageService: ResizeImageService,
  ) {}

  public async getImage(id: any, size: ImageSize): Promise<Readable> {
    const cachedImage: Readable = await this.imageDao.getImage(id, size);
    if (cachedImage) {
      return cachedImage;
    }
    const defaultImage: Readable = await this.imageDao.getImage(id);
    if (!defaultImage) {
      throw new Error('Image not found');
    }
    const resultImage: Readable = this.resizeImageService.resizeImage(
      defaultImage,
      size,
    );
    this.imageDao.saveImage(resultImage, id, size);
    return resultImage;
  }
}
