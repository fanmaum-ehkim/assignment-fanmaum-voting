import { CurrentUserDto } from './auth/dto/current-user.dto';

declare global {
  interface BigInt {
    toJSON(): string;
  }
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserDto {}
    interface Request {
      context: RequestContext;
      user?: CurrentUserDto | null;
    }
  }
}
