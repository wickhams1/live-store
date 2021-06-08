import { UserResolver, UserResolverDependencies, BookResolver, BookResolverDependencies } from '.';
import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';

export interface Dependencies extends UserResolverDependencies, BookResolverDependencies {}

const resolverMap = (dependencies: Dependencies): IResolvers =>
  merge(UserResolver(dependencies), BookResolver(dependencies));
export default resolverMap;
