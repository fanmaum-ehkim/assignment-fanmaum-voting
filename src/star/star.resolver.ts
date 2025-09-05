import { ID, Query, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { StarDto } from './dto/star.dto';
import { StarService } from './star.service';
import { VoteCampaignCandidateStarDto } from '../vote/dto/vote-campaign-candidate-star.dto';

@Resolver(() => StarDto)
export class StarResolver {
  constructor(private starService: StarService) {}

  @ResolveField(() => ID)
  id(parent: StarDto): string {
    return parent.id.toString();
  }

  @ResolveField(() => [VoteCampaignCandidateStarDto])
  async voteCampaignCandidates(
    @Parent() parent: StarDto,
  ): Promise<VoteCampaignCandidateStarDto[]> {
    return await this.starService.getVoteCampaignCandidatesByStarId(parent.id);
  }

  @Query(() => [StarDto])
  async getAllStars(): Promise<StarDto[]> {
    return await this.starService.getAllStars();
  }
}
