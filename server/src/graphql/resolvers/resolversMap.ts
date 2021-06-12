import {
  userResolver,
  UserResolverDependencies,
  itemResolver,
  ItemResolverDependencies,
  productResolver,
  ProductResolverDependencies,
} from '.';
import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';

export interface Dependencies extends UserResolverDependencies, ItemResolverDependencies, ProductResolverDependencies {}

const resolverMap = (dependencies: Dependencies): IResolvers =>
  merge(userResolver(dependencies), itemResolver(dependencies), productResolver(dependencies));
export default resolverMap;
