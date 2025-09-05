import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  private extractToken(req: Request) {
    const authorization = req.headers['authorization'];
    if (!authorization || !authorization.startsWith('Bearer ')) return null;

    const [, token] = authorization.split(' ');
    return token;
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    // jwt 토큰 추출
    const token = this.extractToken(request);

    try {
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // jwt 토큰 검증
      const payload = await this.authService.verifyAccessJwtToken(token);
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }

      // request 객체에 사용자 정보 추가
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
