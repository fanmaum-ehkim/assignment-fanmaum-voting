import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteCampaignDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
