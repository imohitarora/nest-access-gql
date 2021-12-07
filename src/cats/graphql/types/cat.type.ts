import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Owner } from './owner.type';

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field()
  readonly breed: string;

  @Field((type) => Owner, { nullable: true })
  readonly owner?: Owner;
}
