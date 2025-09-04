import { ApiProperty } from '@nestjs/swagger';

export class CreateStarRequestDto {
  @ApiProperty()
  name: string;
}
