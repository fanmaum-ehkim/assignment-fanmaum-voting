import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService
  ) {}

  async createUser(data: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const hashedPassword = await this.authService.hashPassword(data.password);
    return this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
