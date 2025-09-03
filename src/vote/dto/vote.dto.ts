import { ApiProperty } from "@nestjs/swagger";

export class VoteDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  title: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
