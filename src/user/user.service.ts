import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { User } from '@prisma/client';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
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

  async getUserById(userId: bigint): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }

  async updateUser(userId: bigint, input: UpdateUserInput): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...input,
      },
    });
  }
}
