import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { StarService } from './star.service';
import { CreateStarRequestDto } from './dto/create-star-request.dto';
import { StarResponseDto, StarNameFilterDto } from './dto/star-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('star')
export class StarController {
  constructor(private starService: StarService) {}

  @Post()
  @ApiOperation({ summary: '연예인 생성' })
  @ApiBearerAuth()
  async createStar(@Body() data: CreateStarRequestDto): Promise<StarResponseDto> {
    const createdStar = await this.starService.createStar(data);
    return createdStar;
  }

  @Get()
  @ApiOperation({ summary: '연예인 목록 조회' })
  async getStars(
    @Query() pagination: PaginationDto,
    @Query() filter: StarNameFilterDto,
  ): Promise<StarResponseDto[]> {
    return this.starService.getStars(pagination, filter);
  }
}
