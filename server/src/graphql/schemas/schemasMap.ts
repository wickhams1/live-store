import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers, { Dependencies } from '../resolvers';
import { GraphQLSchema } from 'graphql';

import * as emptyTypeDefs from './empty.graphql';
import * as userTypeDefs from './user.graphql';
import * as itemTypeDefs from './item.graphql';
import * as productTypeDefs from './product.graphql';
import * as orderTypeDefs from './order.graphql';

const schema = (dependencies: Dependencies): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: [emptyTypeDefs, userTypeDefs, itemTypeDefs, productTypeDefs, orderTypeDefs],
    resolvers: resolvers(dependencies),
  });
export default schema;
