import { useContext, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { USER_CART_TO_ORDER, GET_USER_CART } from '../../graphql/queries';
import { UserContext } from '../../contexts';
import { Mutation, Query, QueryGetUserCartArgs } from '../../graphql/generated';
import { CartWrapper, CartButtonWrapper } from './styles';
import { Button, Spinner, ProductQuantityList } from '../';

const Cart = () => {
  const client = useApolloClient();
  const [mutationLoading, setMutationLoading] = useState(false);

  const { user } = useContext(UserContext);
  const userId = user?.id || '';

  const { data, loading: queryLoading } = useQuery<Query, QueryGetUserCartArgs>(GET_USER_CART, {
    variables: {
      userId,
    },
    skip: !user,
  });

  const cart = data?.getUserCart?.items;

  const handleOrderSubmit = () => {
    client
      .mutate<Mutation>({
        mutation: USER_CART_TO_ORDER,
        variables: {
          userId: user?.id,
        },
      })
      .then(() => setMutationLoading(false));
    setMutationLoading(true);
  };

  return (
    <CartWrapper>
      {queryLoading && <Spinner />}
      {cart && <ProductQuantityList items={cart} />}

      <CartButtonWrapper>
        {mutationLoading ? <Spinner /> : cart?.length && <Button onClick={handleOrderSubmit}>Submit Order</Button>}
      </CartButtonWrapper>
    </CartWrapper>
  );
};

export default Cart;
