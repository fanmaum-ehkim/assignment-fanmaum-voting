import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { VoteFilterDto } from './dto/vote-filter.dto';
import { VoteDto } from './dto/vote.dto';
import { Prisma, VoteParticipatingStar } from '@prisma/client';
import { VoteDetailDto, VoteDetailStarDto } from './dto/vote-detail.dto';
import { StarDto } from '../star/dto/star.dto';

@Injectable()
export class VoteService {
  constructor(private prismaService: PrismaService) {}

  async createVote(data: CreateVoteDto) {
    return this.prismaService.vote.create({
      data,
    });
  }

  async addStar(
    voteId: number,
    starId: number,
  ): Promise<VoteParticipatingStar> {
    return this.prismaService.voteParticipatingStar.create({
      data: {
        voteId: voteId,
        starId: starId,
      },
    });
  }

  async voteByStarId(
    userId: bigint,
    voteId: bigint,
    starId: bigint,
    quantity: number,
  ) {
    // 존재하는 투표 인지 체크
    const voteParticipatingStar =
      await this.prismaService.voteParticipatingStar.findFirstOrThrow({
        where: {
          voteId: voteId,
          starId: starId,
        },
      });

    // TODO: 마감 기한 종료된 투표인지 확인 처리 필요 (투표 가능상태 체크)
    //

    // TODO: Transaction 처리 필요
    // 표시용 필드 업데이트
    await this.prismaService.voteParticipatingStar.update({
      where: {
        id: voteParticipatingStar.id,
      },
      data: {
        quantity: (voteParticipatingStar.quantity || 0) + quantity,
      },
    });

    // 투표 로그 생성
    const votingLog = await this.prismaService.votingLog.create({
      data: {
        userId: userId,
        voteId: voteParticipatingStar.voteId,
        starId: voteParticipatingStar.starId,
        voteParticipatingStarId: voteParticipatingStar.id,
        quantity: quantity,
      },
    });

    return votingLog;
  }

  async getVotes(
    pagination?: PaginationDto | null,
    filter?: VoteFilterDto | null,
  ): Promise<VoteDto[]> {
    const page = pagination?.page || 1;
    const size = pagination?.size || 10;

    const votes = await this.prismaService.vote.findMany({
      where: this.buildVoteWhereInput(filter),
      skip: (page - 1) * size,
      take: size,
    });
    return votes;
  }

  async getVoteDetail(voteId: bigint): Promise<VoteDetailDto> {
    const vote = await this.prismaService.vote.findUniqueOrThrow({
      where: { id: voteId },
    });
    const voteParticipatingStars =
      await this.prismaService.voteParticipatingStar.findMany({
        where: { id: voteId },
        include: { star: true },
      });
    const result: VoteDetailDto = {
      id: vote.id,
      title: vote.title,
      end: vote.end,
      stars: voteParticipatingStars.map<VoteDetailStarDto>((star) => {
        return {
          id: star.star.id,
          name: star.star.name,
          quantity: star.quantity,
        };
      }),
    };
    return result;
  }

  private buildVoteWhereInput(
    filter?: VoteFilterDto | null,
  ): Prisma.VoteWhereInput {
    return {
      // TODO: end 필드가 오늘 시간으로 안 지났는지 확인 하는 쿼리르 변경
      // ...(filter?.status && {
      //   status: filter.status,
      // }),
      ...(filter?.search && {
        title: {
          contains: filter.search,
        },
      }),
    };
  }
}
