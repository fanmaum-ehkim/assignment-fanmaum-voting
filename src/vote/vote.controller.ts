import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteDto } from './dto/vote.dto';
import { VoteFilterDto } from './dto/vote-filter.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiOperation } from '@nestjs/swagger';
import { VoteDetailDto } from './dto/vote-detail.dto';

@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post()
  @ApiOperation({ summary: '투표 캠페인 생성' })
  async createVote(@Body() data: CreateVoteDto) {
    await this.voteService.createVote(data);
    return { message: 'Vote 생성 완료' };
  }

  @Post('add-star-to-vote')
  @ApiOperation({ summary: '투표 캠페인에 연예인 후보자로 추가' })
  async addStar(
    @Query('voteId') voteId: number,
    @Query('starId') starId: number,
  ) {
    return await this.voteService.addStar(voteId, starId);
  }

  @Post('vote-to-star')
  @ApiOperation({ summary: '투표 캠페인의 연예인 후보자에게 투표하기' })
  async vote(
    @Query('userId') userId: bigint,
    @Query('voteId') voteId: bigint,
    @Query('starId') starId: bigint,
    @Query('quantity') quantity: number,
  ) {
    return await this.voteService.voteByStarId(
      userId,
      voteId,
      starId,
      quantity,
    );
  }

  @Get()
  @ApiOperation({ summary: '투표 캠페인 목록 조회' })
  async getVotes(
    @Query() pagination: PaginationDto,
    @Query() filter: VoteFilterDto,
  ): Promise<VoteDto[]> {
    return this.voteService.getVotes(pagination, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: '투표 캠페인 상세 정보 (연예인 후보자 목록 포함) 조회' })
  async getVoteDetail(@Param('id') voteId: bigint): Promise<VoteDetailDto> {
    return this.voteService.getVoteDetail(voteId);
  }
}
