import { Request, Response } from 'express';
import { CurrentUserDto } from './auth/dto/current-user.dto';

export class RequestContext {
  public get headers() {
    return this.req.headers;
  }

  public get user(): CurrentUserDto | undefined | null {
    return this.req.user;
  }

  constructor(
    public req: Request,
    public res: Response,
  ) {}
}
