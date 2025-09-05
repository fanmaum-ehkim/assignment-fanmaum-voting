import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
export class PaginationDto {
  @ApiProperty({
    description: '페이지 번호',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => Number(value))
  @Field(() => Int, { nullable: true })
  page: number;

  @ApiProperty({
    description: '페이지 당 항목 수',
    required: false,
    type: Number,
  })
  @Transform(({ value }) => Number(value))
  @Field(() => Int, { nullable: true })
  size: number;
}
