import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;
}
