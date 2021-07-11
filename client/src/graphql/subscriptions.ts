import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from './fragments';

export const PRODUCT_CREATED = gql`
  ${PRODUCT_FRAGMENT}
  subscription {
    productCreated {
      ...ProductFragment
    }
  }
`;
