import { ApiProperty } from "@nestjs/swagger";

export class CreateStarDto {
  @ApiProperty()
  name: string;
}
