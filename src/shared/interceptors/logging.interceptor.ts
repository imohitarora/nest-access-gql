import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((data) =>
        console.log({
          statusCode,
          data,
        }),
      ),
    );
  }
}
