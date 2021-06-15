import { ImageSize } from '../types/image-size';
import { Readable } from 'stream';

export abstract class ImageDao {
  abstract getImage(id: any, size: ImageSize): Promise<Readable>;
  abstract getImage(id: any): Promise<Readable>;

  abstract saveImage(id: any, image: any): void;
}
