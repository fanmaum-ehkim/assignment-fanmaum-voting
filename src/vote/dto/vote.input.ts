import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class VoteInput {
  @Field(() => ID)
  voteCampaignId: string;

  @Field(() => ID)
  starId: string;

  @Field()
  quantity: number;
}
