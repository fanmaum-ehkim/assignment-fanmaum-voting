import { Resolver, ResolveField, Parent, ID } from '@nestjs/graphql';
import { VotingLogDto } from '../dto/voting-log.dto';

@Resolver(() => VotingLogDto)
export class VotingLogResolver {
  @ResolveField(() => ID)
  id(@Parent() parent: VotingLogDto): string {
    return parent.id.toString();
  }

  @ResolveField(() => ID)
  userId(@Parent() parent: VotingLogDto): string {
    return parent.userId.toString();
  }

  @ResolveField(() => ID)
  voteCampaignId(@Parent() parent: VotingLogDto): string {
    return parent.voteCampaignId.toString();
  }

  @ResolveField(() => ID)
  starId(@Parent() parent: VotingLogDto): string {
    return parent.starId.toString();
  }
}
