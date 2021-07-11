import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    cart {
      product {
        id
        name
        availableQuantity
      }
    }
    orders {
      id
      items {
        product {
          id
          name
          availableQuantity
        }
      }
    }
  }
`;
