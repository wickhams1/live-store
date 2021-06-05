import { UserResolver, UserResolverDependencies } from '.';
import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';

export interface Dependencies extends UserResolverDependencies {}

const resolverMap = (dependencies: Dependencies): IResolvers => merge(UserResolver(dependencies));
export default resolverMap;
