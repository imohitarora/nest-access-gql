import { ArgsType, Field } from '@nestjs/graphql';

import { FilterByString } from '../types/filter-by-string.type';
import { OrderByString } from '../types/order-by-string.type';

@ArgsType()
export class StringQueryArgs {
  @Field((type) => [FilterByString], { nullable: true })
  filterBy?: FilterByString[];

  @Field((type) => [OrderByString], { nullable: true })
  orderBy?: OrderByString[];
}
