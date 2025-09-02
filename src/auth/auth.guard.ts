import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();

    try {
      // jwt 토큰 추출
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // jwt 토큰 검증
      const payload = await this.authService.verifyJwtToken(token);
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
