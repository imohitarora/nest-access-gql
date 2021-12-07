import { ArgsType, Field } from '@nestjs/graphql';

import { FilterByGeneric, OrderByGeneric } from '../../../shared/graphql/types';
import { CatFields } from '../enums/cat-fields.enum';

const filterByCatFields = FilterByGeneric(CatFields, 'CatFields');
const orderByCatFields = OrderByGeneric(CatFields, 'CatFields');
type FilterByCatFields = InstanceType<typeof filterByCatFields>;
type OrderByCatFields = InstanceType<typeof orderByCatFields>;

@ArgsType()
export class CatQueryArgs {
  @Field((type) => [filterByCatFields], { nullable: true })
  filterBy?: FilterByCatFields[];

  @Field((type) => [orderByCatFields], { nullable: true })
  orderBy?: OrderByCatFields[];
}
