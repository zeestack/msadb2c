import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class CatchErrorInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return this.transform(data);
      }),
    );
  }

  transform<T extends { isError: boolean }>(data: T) {
    if (data.isError)
      throw new HttpException(data, data['status'] || HttpStatus.BAD_REQUEST);
    return data;
  }
}
