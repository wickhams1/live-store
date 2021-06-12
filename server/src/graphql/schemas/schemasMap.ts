import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers, { Dependencies } from '../resolvers';
import { GraphQLSchema } from 'graphql';

import * as emptyTypeDefs from './empty.graphql';
import * as userTypeDefs from './user.graphql';
import * as itemTypeDefs from './item.graphql';
import * as productTypeDefs from './product.graphql';

const schema = (dependencies: Dependencies): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: [emptyTypeDefs, userTypeDefs, itemTypeDefs, productTypeDefs],
    resolvers: resolvers(dependencies),
  });
export default schema;
