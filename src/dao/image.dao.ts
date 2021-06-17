import { ImageSize } from '../types/image-size';
import { Readable } from 'stream';

export abstract class ImageDao {
  abstract getImage(id: any, size?: ImageSize): Promise<Readable>;

  abstract saveImage(image: Readable, id: string, size?: ImageSize): void;
}
