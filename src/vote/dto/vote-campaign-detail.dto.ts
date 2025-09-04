import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class VoteCampaignDetailDto {
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
  @Field(() => [VoteCampaignDetailStarDto])
  stars: VoteCampaignDetailStarDto[];
}

@ObjectType()
export class VoteCampaignDetailStarDto {
  @ApiProperty()
  @Field(() => ID)
  id: bigint;

  @ApiProperty()
  @Field(() => String)
  name: string;

  @ApiProperty()
  @Field(() => Number)
  quantity: number;
}
