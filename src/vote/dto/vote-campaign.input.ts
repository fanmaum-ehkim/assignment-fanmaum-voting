import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class VoteCampaignInput {
  @ApiProperty()
  @Field(() => ID)
  id: bigint;

  @ApiProperty()
  @Field(() => String)
  title: string;

  @ApiProperty()
  @Field(() => Date)
  startTime: Date;

  @ApiProperty()
  @Field(() => Date)
  endTime: Date;

  @ApiProperty()
  @Field(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date)
  updatedAt: Date;
}
