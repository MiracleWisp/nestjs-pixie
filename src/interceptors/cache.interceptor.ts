import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ImageService } from '../services/image-service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private imageService: ImageService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return new Promise((resolve) => {
      this.imageService
        .getImage(null, null)
        .then((imageStream) => resolve(of(imageStream)))
        .catch(() => resolve(next.handle()));
    });
  }
}
