import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Provider {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly providerId: string;

  @Field()
  readonly name: string;
}
