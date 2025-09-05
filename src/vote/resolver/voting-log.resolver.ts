import { Resolver, ResolveField, Parent, ID, Query } from '@nestjs/graphql';
import { VotingLogDto } from '../dto/voting-log.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/user.service';
import { VoteService } from '../vote.service';
import { StarService } from '../../star/star.service';
import { StarDto } from '../../star/dto/star.dto';
import { VoteCampaignDto } from '../dto/vote-campaign.dto';
import { VoteCampaignCandidateStarDto } from '../dto/vote-campaign-candidate-star.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/decorator/user.decorator';
import { CurrentUserDto } from '../../auth/dto/current-user.dto';

@Resolver(() => VotingLogDto)
export class VotingLogResolver {
  constructor(
    private userService: UserService,
    private voteService: VoteService,
    private starService: StarService,
  ) {}
  @ResolveField(() => ID)
  id(@Parent() parent: VotingLogDto): string {
    return parent.id.toString();
  }

  @ResolveField(() => String)
  userId(@Parent() parent: VotingLogDto): string {
    return parent.userId.toString();
  }

  @ResolveField(() => String)
  voteCampaignId(@Parent() parent: VotingLogDto): string {
    return parent.voteCampaignId.toString();
  }

  @ResolveField(() => String)
  starId(@Parent() parent: VotingLogDto): string {
    return parent.starId.toString();
  }
  @ResolveField(() => String)
  voteCampaignCandidateStarId(@Parent() parent: VotingLogDto): string {
    return parent.voteCampaignCandidateStarId.toString();
  }

  @ResolveField(() => UserDto)
  async user(@Parent() parent: VotingLogDto): Promise<UserDto> {
    return this.userService.getUserById(parent.userId);
  }

  @ResolveField(() => VoteCampaignDto)
  async voteCampaign(@Parent() parent: VotingLogDto): Promise<VoteCampaignDto> {
    return this.voteService.getVoteCampaignById(parent.voteCampaignId);
  }

  @ResolveField(() => StarDto)
  async star(@Parent() parent: VotingLogDto): Promise<StarDto> {
    return this.starService.getStarById(parent.starId);
  }

  @ResolveField(() => VoteCampaignCandidateStarDto)
  async voteCampaignCandidateStar(
    @Parent() parent: VotingLogDto,
  ): Promise<VoteCampaignCandidateStarDto> {
    return this.voteService.getVoteCampaignCandidateStarById(
      parent.voteCampaignCandidateStarId,
    );
  }

  @Query(() => [VotingLogDto])
  @UseGuards(AuthGuard)
  async getMyVotingLogs(
    @CurrentUser() user: CurrentUserDto,
  ): Promise<VotingLogDto[]> {
    return this.voteService.getVotingLogsByUserId(user.userId);
  }
}
