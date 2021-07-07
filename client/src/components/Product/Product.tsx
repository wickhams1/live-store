import { useContext, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  Product as ProductType,
  Mutation,
  MutationAddProductsToCartArgs,
  MutationCreateItemArgs,
} from '../../graphql/generated';
import {
  ProductWrapper,
  ProductButtonWrapper,
  Title,
  Quantity,
  ProductContentsWrapper,
  AddProductsButtonWrapper,
  QuantityWrapper,
} from './styles';
import { Button } from '../';
import { ADD_ITEM_TO_CART, CREATE_ITEM } from '../../graphql/queries';
import { UserContext } from '../../contexts';

interface Props extends ProductType {}

const Product = ({ name, availableQuantity, id }: Props) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const { user, loggedIn } = useContext(UserContext);
  const userId = user?.id || '';

  const addItem = () => {
    client.mutate<Mutation, MutationCreateItemArgs>({ mutation: CREATE_ITEM, variables: { item: { productId: id } } });
  };

  const addToCart = () => {
    client
      .mutate<Mutation, MutationAddProductsToCartArgs>({
        mutation: ADD_ITEM_TO_CART,
        variables: {
          userId,
          products: [{ productId: id, quantity: 1 }],
        },
      })
      .then(() => setLoading(false));

    setLoading(true);
  };

  return (
    <ProductWrapper>
      <Title>{name}</Title>
      {typeof availableQuantity === 'number' && (
        <ProductContentsWrapper>
          <QuantityWrapper>
            <Quantity>Quantity: {availableQuantity}</Quantity>
            <AddProductsButtonWrapper>
              <Button onClick={addItem}>+</Button>
            </AddProductsButtonWrapper>
          </QuantityWrapper>

          {loggedIn && (
            <ProductButtonWrapper>
              <Button onClick={addToCart} disabled={loading || !availableQuantity}>
                Add to Cart
              </Button>
            </ProductButtonWrapper>
          )}
        </ProductContentsWrapper>
      )}
    </ProductWrapper>
  );
};

export default Product;
