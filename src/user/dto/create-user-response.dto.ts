import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserResponseDto {
  @ApiProperty()
  @Expose()
  id: bigint;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  constructor(partial: Partial<CreateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
