import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);

    // INFO: 에러 로깅 관련 로직이 추가될 수 있음
    console.error('@@ Uncaught exception:', exception);
  }
}
