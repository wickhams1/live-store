import {
  userResolver,
  UserResolverDependencies,
  itemResolver,
  ItemResolverDependencies,
  productResolver,
  ProductResolverDependencies,
  orderResolver,
  OrderResolverDependencies,
} from '.';
import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';

export interface Dependencies
  extends UserResolverDependencies,
    ItemResolverDependencies,
    ProductResolverDependencies,
    OrderResolverDependencies {}

const resolverMap = (dependencies: Dependencies): IResolvers =>
  merge(
    userResolver(dependencies),
    itemResolver(dependencies),
    productResolver(dependencies),
    orderResolver(dependencies)
  );
export default resolverMap;
