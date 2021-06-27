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

export const FIND_USER_BY_EMAIL_ADDRESS = gql`
  query findUserByEmailAddress($emailAddress: String!) {
    findUserByEmailAddress(emailAddress: $emailAddress) {
      user {
        id
        name
        emailAddress
        cart {
          product {
            id
            name
          }
        }
        orders {
          id
          items {
            product {
              id
              name
            }
          }
        }
      }
    }
  }
`;
