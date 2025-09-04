import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('VotingLog')
export class VotingLogDto {
  @Field(() => ID)
  id: bigint;

  @Field(() => ID)
  userId: bigint;

  @Field(() => ID)
  voteCampaignId: bigint;

  @Field(() => ID)
  starId: bigint;

  @Field(() => Number)
  quantity: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
