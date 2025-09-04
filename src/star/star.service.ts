import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStarRequestDto } from './dto/create-star-request.dto';
import { StarResponseDto, StarNameFilterDto } from './dto/star-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class StarService {
  constructor(private prismaService: PrismaService) {}

  async createStar(data: CreateStarRequestDto): Promise<StarResponseDto> {
    return this.prismaService.star.create({
      data,
    });
  }

  async getStars(
    pagination?: PaginationDto | null,
    filter?: StarNameFilterDto,
  ): Promise<StarResponseDto[]> {
    const page = pagination?.page || 1;
    const size = pagination?.size || 10;

    const stars = await this.prismaService.star.findMany({
      where: this.buildStartWhereInput(filter),
      skip: (page - 1) * size,
      take: size,
    });
    return stars;
  }

  private buildStartWhereInput(filter?: StarNameFilterDto | null) {
    return {
      ...(filter?.name && {
        name: {
          contains: filter?.name,
        },
      }),
    };
  }
}
