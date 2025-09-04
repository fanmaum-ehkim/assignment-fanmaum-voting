import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestContext } from 'src/request-context';
import { CurrentUserDto } from '../dto/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data, ctx: GqlExecutionContext): CurrentUserDto | null | undefined => {
    if (ctx.getType() === 'http') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ctx.switchToHttp().getRequest().user;
    } else if (ctx.getType() === 'graphql') {
      return GqlExecutionContext.create(ctx).getContext<RequestContext>().user;
    }

    return null;
  },
);
