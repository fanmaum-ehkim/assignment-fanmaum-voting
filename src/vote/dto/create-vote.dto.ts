import { ApiProperty } from "@nestjs/swagger";

export class CreateVoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
