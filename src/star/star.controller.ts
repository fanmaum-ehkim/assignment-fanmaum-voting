import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { StarService } from './star.service';
import { CreateStarDto } from './dto/create-star.dto';
import { StarDto, StarNameFilterDto } from './dto/star.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('star')
export class StarController {
  constructor(private starService: StarService) {}

  @Post()
  @ApiOperation({ summary: '연예인 생성' })
  @ApiBearerAuth()
  async createStar(@Body() data: CreateStarDto) {
    await this.starService.createStar(data);
    return { message: 'Star 생성 완료' };
  }

  @Get()
  @ApiOperation({ summary: '연예인 목록 조회' })
  async getStars(
    @Query() pagination: PaginationDto,
    @Query() filter: StarNameFilterDto,
  ): Promise<StarDto[]> {
    return this.starService.getStars(pagination, filter);
  }
}
