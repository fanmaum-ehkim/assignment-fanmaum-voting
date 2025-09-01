import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class VoteFilterDto {
  @ApiProperty({
    description: '상태: true-진행중, false-종료',
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Transform((value) => Boolean(value))
  status?: boolean;

  @ApiProperty({
    description: '검색어',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
