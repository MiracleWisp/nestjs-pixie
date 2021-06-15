import { Injectable } from '@nestjs/common';
import { ImageSize } from '../types/image-size';
import * as sharp from 'sharp';
import { Sharp } from 'sharp';
import { Readable } from 'stream';

@Injectable()
export class ResizeImageService {
  resizeImage(image: Readable, size: ImageSize): Readable {
    const transformer: Sharp = sharp().resize(size.width, size.height);
    return image.pipe(transformer);
  }
}
