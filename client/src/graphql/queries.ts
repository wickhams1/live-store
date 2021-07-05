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
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      user {
        id
        name
        emailAddress
      }
    }
  }
`;

export const USER_CART_TO_ORDER = gql`
  mutation createOrderFromUserCart($userId: String!) {
    createOrderFromUserCart(userId: $userId) {
      order {
        id
        items {
          product {
            name
          }
        }
      }
    }
  }
`;

export const GET_USER_CART = gql`
  query getUserCart($userId: String!) {
    getUserCart(userId: $userId) {
      items {
        id
        product {
          name
        }
      }
    }
  }
`;

export const GET_USER_ORDERS = gql`
  query getUserOrders($userId: String!) {
    getUserOrders(userId: $userId) {
      orders {
        id
        items {
          id
          product {
            name
          }
        }
      }
    }
  }
`;
