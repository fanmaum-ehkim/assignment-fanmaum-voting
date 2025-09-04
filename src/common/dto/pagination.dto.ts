import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    description: '페이지 번호',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty({
    description: '페이지 당 항목 수',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => Number(value))
  size: number;
}
