import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ReadStream } from 'fs';
import { ImageService } from './image-service';
import { ImageSize } from '../types/image-size';

@Injectable()
export class LocalStorageImageServiceService extends ImageService {
  getImage(id: string, size?: ImageSize): Promise<ReadStream> {
    const imageStream = fs.createReadStream('./images/test.jpg');

    return new Promise((resolve, reject) => {
      imageStream.on('open', () => {
        resolve(imageStream);
      });
      imageStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  saveImage(id: string, image: any): void {}
}
