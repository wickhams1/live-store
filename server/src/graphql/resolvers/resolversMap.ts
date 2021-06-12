import { UserResolver, UserResolverDependencies, ItemResolver, ItemResolverDependencies } from '.';
import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';

export interface Dependencies extends UserResolverDependencies, ItemResolverDependencies {}

const resolverMap = (dependencies: Dependencies): IResolvers =>
  merge(UserResolver(dependencies), ItemResolver(dependencies));
export default resolverMap;
