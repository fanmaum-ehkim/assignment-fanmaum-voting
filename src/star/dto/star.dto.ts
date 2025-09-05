import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Star')
export class StarDto {
  id: bigint;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
