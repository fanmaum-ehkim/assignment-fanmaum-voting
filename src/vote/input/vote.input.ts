import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('VoteInput')
export class VoteInput {
  @Field(() => String)
  voteCampaignId: string;

  @Field(() => String)
  starId: string;

  @Field(() => Int)
  quantity: number;
}
