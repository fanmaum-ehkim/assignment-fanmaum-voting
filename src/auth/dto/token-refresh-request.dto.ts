import { ApiProperty } from '@nestjs/swagger';

export class TokenRefreshRequestDto {
  @ApiProperty({ description: 'Refresh Token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'})
  refreshToken: string;
}
