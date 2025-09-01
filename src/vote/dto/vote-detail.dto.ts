import { ApiProperty } from '@nestjs/swagger';

export class VoteDetailDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  title: string;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  stars: VoteDetailStarDto[];
}

export class VoteDetailStarDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;
}
