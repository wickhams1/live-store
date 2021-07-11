import { gql } from '@apollo/client';
import { USER_FRAGMENT, PRODUCT_FRAGMENT } from './fragments';

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query getProducts {
    getProducts {
      products {
        ...ProductFragment
      }
    }
  }
`;

export const FIND_USER_BY_EMAIL_ADDRESS = gql`
  ${USER_FRAGMENT}
  query findUserByEmailAddress($emailAddress: String!) {
    findUserByEmailAddress(emailAddress: $emailAddress) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  ${USER_FRAGMENT}
  query findUser($id: String!) {
    findUser(id: $id) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const CREATE_USER = gql`
  ${USER_FRAGMENT}
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const USER_CART_TO_ORDER = gql`
  ${USER_FRAGMENT}
  mutation createOrderFromUserCart($userId: String!) {
    createOrderFromUserCart(userId: $userId) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  ${USER_FRAGMENT}

  mutation createOrderFromUserCart($userId: String!, $products: [ProductRelationInput!]!) {
    addProductsToCart(userId: $userId, products: $products) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  mutation createProduct($product: ProductInput!) {
    createProduct(product: $product) {
      product {
        ...ProductFragment
      }
    }
  }
`;

export const CREATE_ITEM = gql`
  ${PRODUCT_FRAGMENT}
  mutation createItem($item: ItemInput!) {
    createItem(item: $item) {
      item {
        product {
          ...ProductFragment
        }
      }
    }
  }
`;
