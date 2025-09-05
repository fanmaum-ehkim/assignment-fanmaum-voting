import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  id: bigint;

  @Field(() => String)
  username: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}
