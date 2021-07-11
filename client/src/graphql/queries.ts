import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      products {
        id
        name
        availableQuantity
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
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query findUser($id: String!) {
    findUser(id: $id) {
      user {
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
      user {
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
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation createOrderFromUserCart($userId: String!, $products: [ProductRelationInput!]!) {
    addProductsToCart(userId: $userId, products: $products) {
      user {
        id
        cart {
          product {
            name
            id
            availableQuantity
          }
        }
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($product: ProductInput!) {
    createProduct(product: $product) {
      product {
        id
        name
        availableQuantity
      }
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation createItem($item: ItemInput!) {
    createItem(item: $item) {
      item {
        product {
          id
          name
          availableQuantity
        }
      }
    }
  }
`;
