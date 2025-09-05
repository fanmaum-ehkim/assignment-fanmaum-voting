import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { VoteCampaignDto } from '../dto/vote-campaign.dto';
import { VoteCampaignOffsetConnection } from '../connection/vote-campaign-offset.connection';

@Resolver(() => VoteCampaignOffsetConnection)
export class UserOffsetConnectionResolver {
  constructor() {}
  @ResolveField(() => [VoteCampaignDto])
  async nodes(
    @Parent() parent: VoteCampaignOffsetConnection,
  ): Promise<VoteCampaignDto[]> {
    return parent.getNodes();
  }

  @ResolveField(() => Number)
  async totalCount(
    @Parent() parent: VoteCampaignOffsetConnection,
  ): Promise<number> {
    return parent.getTotalCount();
  }
}
