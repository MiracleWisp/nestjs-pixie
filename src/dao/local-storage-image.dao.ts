import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ReadStream, WriteStream } from 'fs';
import { ImageSize } from '../types/image-size';
import { ImageDao } from './image.dao';
import { Readable } from 'stream';

@Injectable()
export class LocalStorageImageDao extends ImageDao {
  getImage(id: string, size?: ImageSize): Promise<Readable> {
    const imageStream: ReadStream = fs.createReadStream(
      this.composeImagePath(id, size),
    );
    return new Promise((resolve) => {
      imageStream.on('open', () => {
        resolve(imageStream);
      });
      imageStream.on('error', (err) => {
        console.log(err);
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
      return `./images/${id}${width}${height}.jpg`;
    } else {
      return `./images/${id}.jpg`;
    }
  }
}
