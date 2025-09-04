import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  id: bigint;

  @Field(() => String)
  username: string;

  @Field(() => Date)
  createdAt: Date;
}
