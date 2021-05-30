import { IResolvers } from 'graphql-tools';

import { QueryPersonArgs, Scalars } from '../generated';

export const PersonResolver: IResolvers = {
  Query: {
    async greeting(_: void, { firstName, lastName }: QueryPersonArgs): Promise<Scalars['String']> {
      return `Hello ${firstName} ${lastName}!`;
    },
  },
};
