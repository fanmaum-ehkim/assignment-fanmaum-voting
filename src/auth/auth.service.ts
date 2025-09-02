import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from './interface/user-jwt-payload';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from 'src/common/exception/unauthorized.exception';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(signinDto: SigninDto) {
    // 유저 조회
    const user = await this.prismaService.user.findUnique({
      where: { username: signinDto.username },
    });
    if (!user) {
      throw new ForbiddenException();
    }

    // 비밀번호 검증
    const isValid = await this.validatePassword(
      signinDto.password,
      user.password,
    );
    if (!isValid) {
      throw new ForbiddenException();
    }

    return user;
  }

  async signJwtToken(payload: UserJwtPayload) {
    const newJti = randomUUID();

    const expiresIn = '1h';

    const token = await this.jwtService.signAsync(
      { ...payload, jti: newJti },
      { expiresIn, secret: process.env.JWT_SECRET },
    );

    return token;
  }

  async verifyJwtToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
