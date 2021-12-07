import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const startAt = process.hrtime();
    const { ip, method, baseUrl, body } = req;
    //const userAgent = req.get('user-agent') || '';
    console.log(`${method} ${baseUrl} ${ip} ${JSON.stringify(body)}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const statusMessage = res.statusMessage || '';
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      console.log(`${method} ${baseUrl} ${statusCode} ${statusMessage} ${responseTime}ms ${contentLength} - ${ip}`);
    });

    next();
  }
}
