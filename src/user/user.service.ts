import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService
  ) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(data.password);
    return this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
