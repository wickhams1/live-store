import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers, { Dependencies } from '../resolvers';
import { GraphQLSchema } from 'graphql';

import * as emptyTypeDefs from './empty.graphql';
import * as userTypeDefs from './user.graphql';
import * as bookTypeDefs from './book.graphql';

const schema = (dependencies: Dependencies): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: [emptyTypeDefs, userTypeDefs, bookTypeDefs],
    resolvers: resolvers(dependencies),
  });
export default schema;
