import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';

import { UserResolver } from './resolvers';

const resolverMap: IResolvers = merge(UserResolver);
export default resolverMap;
