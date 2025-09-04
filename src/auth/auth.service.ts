import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserAccessJwtPayload,
  UserRefreshJwtPayload,
} from './interface/user-jwt-payload';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from 'src/common/exception/unauthorized.exception';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
import { CurrentUserDto } from './dto/current-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(signinDto: SigninDto): Promise<CurrentUserDto> {
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

    return plainToInstance(CurrentUserDto, { userId: user.id, ...user });
  }

  async signAccessJwtTokenByUserId(userId: bigint): Promise<string> {
    // TODO: 만료시간 env 혹은 config 관리로 변경
    const expiresIn = '30m';

    const payload: UserAccessJwtPayload = { userId };

    const token = await this.jwtService.signAsync(
      { ...payload },
      { expiresIn, secret: process.env.JWT_SECRET },
    );

    return token;
  }

  async signRefreshJwtTokenByUserId(userId: bigint): Promise<string> {
    // TODO: 만료시간 env 혹은 config 관리로 변경
    const expiresIn = '30d';

    const jwtid = randomUUID();
    const payload: UserRefreshJwtPayload = { userId, jti: jwtid };

    const token = await this.jwtService.signAsync(
      { ...payload },
      { expiresIn, secret: process.env.JWT_SECRET },
    );

    // TODO: jti 해싱 저장 필요 여부 검토
    await this.prismaService.session.create({
      data: {
        userId: userId,
        jti: jwtid,
      },
    });

    return token;
  }

  async verifyAccessJwtToken(token: string): Promise<UserAccessJwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async verifyRefreshJwtToken(token: string): Promise<UserRefreshJwtPayload> {
    try {
      // 토큰 검증
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })) as UserRefreshJwtPayload;

      // DB에서 jti 값 체크
      const session = await this.prismaService.session.findFirstOrThrow({
        where: { userId: payload.userId, jti: payload.jti },
      });
      // TODO: session에 기록한 만료 시간과 토큰 만료 여부 검증 필요
      if (!session || session.deletedAt) {
        throw new UnauthorizedException();
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async tokenRefresh(refreshToken: string): Promise<TokenResponseDto> {
    const { userId, jti } = await this.verifyRefreshJwtToken(refreshToken);

    const newAccessToken = await this.signAccessJwtTokenByUserId(userId);

    // TODO: Transaction 처리 필요 (새토큰 발행 -> 기존 토큰 만료)
    const newRefreshToken = await this.signRefreshJwtTokenByUserId(userId);
    await this.prismaService.session.updateMany({
      // jti 테이블 unique 적용 검토
      where: { userId, jti },
      data: { deletedAt: new Date() },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
