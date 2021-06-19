import { ImageSize } from '../types/image-size';
import { ImageDao } from '../dao/image.dao';
import { ResizeImageService } from './resize-image.service';
import { Inject, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { PIXIE_CONFIG } from '../consts/injection-tokens';
import { PixieOptions } from '../types/pixie-options';
import { ImageNotFoundError } from '../exceptions/image-not-found.error';
import { SizeNotAllowedError } from '../exceptions/size-not-allowed.error';

@Injectable()
export class ImageService {
  constructor(
    private imageDao: ImageDao,
    private resizeImageService: ResizeImageService,
    @Inject(PIXIE_CONFIG) private options: PixieOptions,
  ) {}

  public async getImage(id: any, size: ImageSize): Promise<Readable> {
    if (!this.isSizeAllowed(size)) {
      throw new SizeNotAllowedError();
    }
    const cachedImage: Readable = await this.imageDao.getImage(id, size);
    if (cachedImage) {
      return cachedImage;
    }
    const defaultImage: Readable = await this.imageDao.getImage(id);
    if (!defaultImage) {
      throw new ImageNotFoundError();
    }
    const resultImage: Readable = this.resizeImageService.resizeImage(
      defaultImage,
      size,
    );
    this.imageDao.saveImage(resultImage, id, size);
    return resultImage;
  }

  private isSizeAllowed(size: ImageSize): boolean {
    if (!this.options.whitelist || !size) {
      return true;
    }
    return this.options.whitelist.some(
      (whiteSize) =>
        whiteSize.width == size.width && whiteSize.height == size.height,
    );
  }
}
