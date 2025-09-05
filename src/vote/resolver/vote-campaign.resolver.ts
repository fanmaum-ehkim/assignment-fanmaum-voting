import {
  Resolver,
  Query,
  Args,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { VoteService } from '../vote.service';
import { VoteCampaignDto } from '../dto/vote-campaign.dto';
import { VoteCampaignFilterInput } from '../input/vote-campaign-filter.input';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { VotingLogDto } from '../dto/voting-log.dto';
import { VoteCampaignCandidateStarDto } from '../dto/vote-campaign-candidate-star.dto';
import { VoteCampaignOffsetConnection } from '../connection/vote-campaign-offset.connection';

@Resolver(() => VoteCampaignDto)
export class VoteCampaignResolver {
  constructor(private voteService: VoteService) {}

  @ResolveField(() => ID)
  id(@Parent() parent: VoteCampaignDto): string {
    return parent.id.toString();
  }

  @ResolveField(() => [VoteCampaignCandidateStarDto])
  async candidateStars(
    @Parent() parent: VoteCampaignDto,
  ): Promise<VoteCampaignCandidateStarDto[]> {
    return this.voteService.getVoteCampaignCandidateStarsByVoteCampaignId(
      parent.id,
    );
  }

  @ResolveField(() => [VotingLogDto])
  async votingLogs(@Parent() parent: VoteCampaignDto): Promise<VotingLogDto[]> {
    return this.voteService.getVotingLogsByVoteCampaignId(parent.id);
  }

  @Query(() => [VoteCampaignDto])
  async getVoteCampaigns(
    @Args('pagination', { type: () => PaginationDto, nullable: true })
    pagination?: PaginationDto,
    @Args('filter', { type: () => VoteCampaignFilterInput, nullable: true })
    filter?: VoteCampaignFilterInput,
  ): Promise<VoteCampaignDto[]> {
    return this.voteService.getVoteCampaigns(pagination, filter);
  }

  @Query(() => VoteCampaignOffsetConnection)
  async getVoteCampaignsWithOffsetPagination(
    @Args('pagination', { type: () => PaginationDto, nullable: true })
    pagination?: PaginationDto,
    @Args('filter', { type: () => VoteCampaignFilterInput, nullable: true })
    filter?: VoteCampaignFilterInput,
  ): Promise<VoteCampaignOffsetConnection> {
    return {
      getNodes: () => this.voteService.getVoteCampaigns(pagination, filter),
      getTotalCount: () => this.voteService.countVoteCampaigns(filter),
    };
  }
}
