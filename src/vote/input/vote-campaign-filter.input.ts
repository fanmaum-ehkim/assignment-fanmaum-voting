import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType('VoteCampaignFilterInput')
export class VoteCampaignFilterInput {
  @ApiProperty({
    description: '상태: true-진행중, false-종료',
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @Transform((value) => Boolean(value))
  status?: boolean;

  @ApiProperty({
    description: '검색어',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  search?: string;
}
