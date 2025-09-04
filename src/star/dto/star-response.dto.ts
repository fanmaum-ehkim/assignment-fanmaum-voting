import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class StarResponseDto {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  id: bigint;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class StarNameFilterDto {
  @ApiProperty({
    description: '검색어 (이름)',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
