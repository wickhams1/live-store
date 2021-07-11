import { useContext } from 'react';
import { useMutation } from '@apollo/client';
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
  const { user, loggedIn } = useContext(UserContext);
  const userId = user?.id || '';

  const [createItem] = useMutation<Mutation, MutationCreateItemArgs>(CREATE_ITEM, {
    variables: { item: { productId: id } },
  });
  const [addItemToCart, { loading: addItemToCartLoading }] = useMutation<Mutation, MutationAddProductsToCartArgs>(
    ADD_ITEM_TO_CART,
    {
      variables: {
        userId,
        products: [{ productId: id, quantity: 1 }],
      },
    }
  );

  const addItem = () => {
    createItem();
  };

  const addToCart = () => {
    addItemToCart().catch((e) => console.error(e));
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
              <Button onClick={addToCart} disabled={addItemToCartLoading || !availableQuantity}>
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
