import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('VoteCampaignCandidateStar')
export class VoteCampaignCandidateStarDto {
  id: bigint;

  voteCampaignId: bigint;

  starId: bigint;

  quantity: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
