import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStarDto } from './dto/create-star.dto';
import { StarDto, StarFilterDto } from './dto/star.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class StarService {
  constructor(private prismaService: PrismaService) {}

  async createStar(data: CreateStarDto) {
    return this.prismaService.star.create({
      data,
    });
  }

  async getStars(
    pagination?: PaginationDto | null,
    filter?: StarFilterDto,
  ): Promise<StarDto[]> {
    const page = pagination?.page || 1;
    const size = pagination?.size || 10;

    const stars = await this.prismaService.star.findMany({
      where: this.buildStartWhereInput(filter),
      skip: (page - 1) * size,
      take: size,
    });
    return stars;
  }

  private buildStartWhereInput(filter?: StarFilterDto | null) {
    return {
      ...(filter?.name && {
        name: {
          contains: filter?.name,
        },
      }),
    };
  }
}
