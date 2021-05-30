import { IResolvers } from 'graphql-tools';
import { merge } from 'lodash';
import { PersonResolver } from './resolvers/PersonResolver';

const resolverMap: IResolvers = merge(PersonResolver);
export default resolverMap;
