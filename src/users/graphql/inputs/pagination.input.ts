import { ArgsType, Field, Int } from '@nestjs/graphql';

import { StringQueryArgs } from '../../../shared/graphql/inputs';

@ArgsType()
export class UserQueryArgs extends StringQueryArgs {
  @Field(() => Int)
  first: number;

  @Field(() => Int)
  offset: number;

  @Field({ nullable: true })
  cursor: string;
}
