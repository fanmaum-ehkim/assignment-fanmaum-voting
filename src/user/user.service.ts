import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
