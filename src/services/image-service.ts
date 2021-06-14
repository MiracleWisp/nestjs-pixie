import { ReadStream } from 'fs';
import { ImageSize } from '../types/image-size';

export abstract class ImageService {
  abstract getImage(id: any, size?: ImageSize): Promise<ReadStream>;

  abstract saveImage(id: any, image: any): void;
}
