import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('VotingLogDto')
export class VotingLogDto {
  id: bigint;

  userId: bigint;

  voteCampaignId: bigint;

  starId: bigint;

  voteCampaignCandidateStarId: bigint;

  @Field(() => Int)
  quantity: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
