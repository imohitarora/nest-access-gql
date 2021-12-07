import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

const REQUEST_TIMEOUT = 5000;

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(REQUEST_TIMEOUT));
  }
}
