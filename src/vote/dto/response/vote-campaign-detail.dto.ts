import { ApiProperty } from '@nestjs/swagger';

export class VoteCampaignDetailDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  title: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  stars: VoteCampaignDetailStarDto[];
}

export class VoteCampaignDetailStarDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;
}
