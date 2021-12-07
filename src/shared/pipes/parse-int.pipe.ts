import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  transform(value: string, metadata: ArgumentMetadata) {
    const val = Number.parseInt(value, 10);

    if (Number.isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }

    return val;
  }
}
