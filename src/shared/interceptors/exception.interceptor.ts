import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return (
      next
        .handle()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
        .pipe(catchError((err) => throwError(new HttpException('New message', HttpStatus.BAD_GATEWAY))))
    );
  }
}
