import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VoteCampaignDto {
  @ApiProperty()
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
