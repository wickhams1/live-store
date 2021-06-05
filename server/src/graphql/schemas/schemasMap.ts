import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers, { Dependencies } from '../resolvers';
import { GraphQLSchema } from 'graphql';

import * as emptyTypeDefs from './empty.graphql';
import * as userTypeDefs from './user.graphql';

const schema = (dependencies: Dependencies): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: [emptyTypeDefs, userTypeDefs],
    resolvers: resolvers(dependencies),
  });
export default schema;
