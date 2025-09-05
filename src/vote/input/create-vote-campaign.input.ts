import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateVoteCampaignInput')
export class CreateVoteCampaignInput {
  @ApiProperty()
  @Field()
  title: string;

  @ApiProperty()
  @Field()
  startTime: Date;

  @ApiProperty()
  @Field()
  endTime: Date;
}
