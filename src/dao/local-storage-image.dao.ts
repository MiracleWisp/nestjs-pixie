import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ReadStream, WriteStream } from 'fs';
import { ImageSize } from '../types/image-size';
import { ImageDao } from './image.dao';
import { Readable } from 'stream';
import { PIXIE_CONFIG } from '../consts/injection-tokens';
import { PixieOptions } from '../types/pixie-options';

@Injectable()
export class LocalStorageImageDao extends ImageDao {
  private folderName: string;

  constructor(@Inject(PIXIE_CONFIG) options: PixieOptions) {
    super();
    this.folderName = options.folderName || 'images';
  }

  getImage(id: string, size?: ImageSize): Promise<Readable> {
    const imageStream: ReadStream = fs.createReadStream(
      this.composeImagePath(id, size),
    );
    return new Promise((resolve) => {
      imageStream.on('open', () => {
        resolve(imageStream);
      });
      imageStream.on('error', () => {
        resolve(null);
      });
    });
  }

  saveImage(image: Readable, id: string, size?: ImageSize): void {
    const fileStream: WriteStream = fs.createWriteStream(
      this.composeImagePath(id, size),
    );
    image.pipe(fileStream);
  }

  private composeImagePath(id: string, size?: ImageSize): string {
    if (size) {
      const width = size.width ? `_w${size.width}` : '';
      const height = size.height ? `_h${size.height}` : '';
      return `./${this.folderName}/${id}${width}${height}`;
    } else {
      return `./${this.folderName}/${id}`;
    }
  }
}
