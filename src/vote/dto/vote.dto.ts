import { ApiProperty } from "@nestjs/swagger";

export class VoteDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  title: string;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
