import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '../dto/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserDto | null | undefined => {
    const request = ctx.switchToHttp().getRequest();

    // TODO: ctx 에 user 가 없을 경우 (ex. 인증이 필요없는 API) null 반환하도록 처리
    // TODO: 데코레이터 적용 순서 관련 문제 가능성 검토 (ex. AuthGuard -> CurrentUser)

    return request.user;
  },
);
