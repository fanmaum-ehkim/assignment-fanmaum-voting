import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VoteService } from '../vote.service';
import { VoteCampaignInput } from '../dto/vote-campaign.input';
import { VoteCampaignDetailDto, VoteCampaignDetailStarDto } from '../dto/vote-campaign-detail.dto';
import { VoteCampaignFilterInput } from '../dto/vote-campaign-filter.input';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { VotingLogDto } from '../dto/voting-log.dto';
import { VoteInput } from '../dto/vote.input';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/decorator/user.decorator';
import { CurrentUserDto } from '../../auth/dto/current-user.dto';

@Resolver(() => VoteCampaignInput)
export class VoteCampaignResolver {
  constructor(private voteService: VoteService) {}

  @ResolveField(() => ID)
  id(@Parent() parent: VoteCampaignInput): string {
    return parent.id.toString();
  }

  @Query(() => [VoteCampaignInput])
  async getVoteCampaigns(
    @Args('pagination', { type: () => PaginationDto, nullable: true })
    pagination?: PaginationDto,
    @Args('filter', { type: () => VoteCampaignFilterInput, nullable: true })
    filter?: VoteCampaignFilterInput,
  ): Promise<VoteCampaignInput[]> {
    return this.voteService.getAllVoteCampaigns(pagination, filter);
  }

  @Query(() => VoteCampaignDetailDto)
  async getVoteCampaignDetail(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<VoteCampaignDetailDto> {
    return this.voteService.getVoteCampaignDetail(BigInt(id));
  }

  @Mutation(() => VotingLogDto)
  @UseGuards(AuthGuard)
  async voteToVoteCampaign(
    @CurrentUser() currentUser: CurrentUserDto,
    @Args('input') input: VoteInput,
  ): Promise<VotingLogDto> {
    return this.voteService.voteToVoteCampaign(
      currentUser.userId,
      BigInt(input.voteCampaignId),
      BigInt(input.starId),
      input.quantity,
    );
  }
}

@Resolver(() => VoteCampaignDetailDto)
export class VoteCampaignDetailResolver {
  @ResolveField(() => ID)
  id(@Parent() parent: VoteCampaignDetailDto): string {
    return parent.id.toString();
  }
}

@Resolver(() => VoteCampaignDetailStarDto)
export class VoteCampaignDetailStarResolver {
  @ResolveField(() => ID)
  id(@Parent() parent: VoteCampaignDetailStarDto): string {
    return parent.id.toString();
  }
}