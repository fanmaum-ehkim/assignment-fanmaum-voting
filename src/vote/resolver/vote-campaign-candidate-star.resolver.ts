import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { VoteCampaignCandidateStarDto } from '../dto/vote-campaign-candidate-star.dto';
import { VoteCampaignDto } from '../dto/vote-campaign.dto';
import { VoteService } from '../vote.service';
import { StarDto } from '../../star/dto/star.dto';
import { StarService } from '../../star/star.service';
import { VotingLogDto } from '../dto/voting-log.dto';

@Resolver(() => VoteCampaignCandidateStarDto)
export class VoteCampaignCandidateStarResolver {
  constructor(
    private voteService: VoteService,
    private starService: StarService,
  ) {}

  @ResolveField(() => ID)
  id(parent: VoteCampaignCandidateStarDto): string {
    return parent.id.toString();
  }

  @ResolveField(() => String)
  voteCampaignId(parent: VoteCampaignCandidateStarDto): string {
    return parent.voteCampaignId.toString();
  }

  @ResolveField(() => String)
  starId(parent: VoteCampaignCandidateStarDto): string {
    return parent.starId.toString();
  }

  @ResolveField(() => VoteCampaignDto)
  async voteCampaign(
    @Parent() parent: VoteCampaignCandidateStarDto,
  ): Promise<VoteCampaignDto> {
    return this.voteService.getVoteCampaignById(parent.voteCampaignId);
  }

  @ResolveField(() => StarDto)
  async star(@Parent() parent: VoteCampaignCandidateStarDto): Promise<StarDto> {
    return this.starService.getStarById(parent.starId);
  }

  @ResolveField(() => [VotingLogDto])
  async votingLogs(
    @Parent() parent: VoteCampaignCandidateStarDto,
  ): Promise<VotingLogDto[]> {
    return this.voteService.getVotingLogsByCampaignCandidateStarId(parent.id);
  }
}
