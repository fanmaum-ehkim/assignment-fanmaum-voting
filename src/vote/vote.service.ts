import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoteCampaignDto } from './dto/create-vote-campaign.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { VoteFilterDto } from './dto/vote-filter.dto';
import { VoteCampaignDto } from './dto/vote-campaign-dto';
import {
  Prisma,
  VoteCampaign,
  VoteCampaignCandidateStar,
  VotingLog,
} from '@prisma/client';
import {
  VoteCampaignDetailDto,
  VoteCampaignDetailStarDto,
} from './dto/vote-campaign-detail.dto';
import { NotFoundException } from 'src/common/exception/not-found.exception';

@Injectable()
export class VoteService {
  constructor(private prismaService: PrismaService) {}

  async createVoteCampaign(data: CreateVoteCampaignDto): Promise<VoteCampaign> {
    return this.prismaService.voteCampaign.create({
      data,
    });
  }

  async addStarToVoteCampaign(
    voteCampaignId: number,
    starId: number,
  ): Promise<VoteCampaignCandidateStar> {
    return this.prismaService.voteCampaignCandidateStar.create({
      data: {
        voteCampaignId: voteCampaignId,
        starId: starId,
      },
    });
  }

  async findVoteCampaignByStarId(
    userId: bigint,
    voteCampaignId: bigint,
    starId: bigint,
    quantity: number,
  ): Promise<VotingLog> {
    // 존재하는 투표 인지 체크
    const voteCampaignCandidateStar =
      await this.prismaService.voteCampaignCandidateStar.findFirstOrThrow({
        where: {
          voteCampaignId: voteCampaignId,
          starId: starId,
        },
      });

    // TODO: 마감 기한 종료된 투표인지 확인 처리 필요 (투표 가능상태 체크)
    //

    // TODO: Transaction 처리 필요
    // 표시용 필드 업데이트
    await this.prismaService.voteCampaignCandidateStar.update({
      where: {
        id: voteCampaignCandidateStar.id,
      },
      data: {
        quantity: (voteCampaignCandidateStar.quantity || 0) + quantity,
      },
    });

    // 투표 로그 생성
    const votingLog = await this.prismaService.votingLog.create({
      data: {
        userId: userId,
        voteCampaignId: voteCampaignCandidateStar.voteCampaignId,
        starId: voteCampaignCandidateStar.starId,
        voteCampaignCandidateStarId: voteCampaignCandidateStar.id,
        quantity: quantity,
      },
    });

    return votingLog;
  }

  async getVotes(
    pagination?: PaginationDto | null,
    filter?: VoteFilterDto | null,
  ): Promise<VoteCampaignDto[]> {
    const page = pagination?.page || 1;
    const size = pagination?.size || 10;

    const votes = await this.prismaService.voteCampaign.findMany({
      where: this.buildVoteWhereInput(filter),
      skip: (page - 1) * size,
      take: size,
    });
    return votes;
  }

  async getVoteDetail(voteCampaignId: bigint): Promise<VoteCampaignDetailDto> {
    const vote = await this.prismaService.voteCampaign.findFirst({
      where: { id: voteCampaignId },
    });
    if (!vote) {
      throw new NotFoundException();
    }

    const voteParticipatingStars =
      await this.prismaService.voteCampaignCandidateStar.findMany({
        where: { voteCampaignId: voteCampaignId },
        include: { star: true },
      });
    const result: VoteCampaignDetailDto = {
      id: vote.id,
      title: vote.title,
      startTime: vote.startTime,
      endTime: vote.endTime,
      stars: voteParticipatingStars.map<VoteCampaignDetailStarDto>((star) => {
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
  ): Prisma.VoteCampaignWhereInput {
    const now = new Date();
    return {
      ...(typeof filter?.status === 'boolean'
        ? filter.status
          ? { AND: [{ startTime: { lte: now } }, { endTime: { gte: now } }] }
          : { OR: [{ startTime: { gt: now } }, { endTime: { lt: now } }] }
        : {}),
      ...(filter?.search && {
        title: {
          contains: filter.search,
        },
      }),
    };
  }
}
