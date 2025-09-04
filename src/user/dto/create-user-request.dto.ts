import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
