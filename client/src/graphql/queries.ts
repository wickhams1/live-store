import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      products {
        id
        name
      }
    }
  }
`;
