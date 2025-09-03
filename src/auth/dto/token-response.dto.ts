import { ApiResponseProperty } from "@nestjs/swagger";

export class TokenResponseDto {
  @ApiResponseProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}
