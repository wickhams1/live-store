import { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { USER_CART_TO_ORDER, FIND_USER_BY_ID } from '../../graphql/queries';
import { UserContext } from '../../contexts';
import { Mutation, Query, QueryFindUserArgs, MutationCreateOrderFromUserCartArgs } from '../../graphql/generated';
import { CartWrapper, CartButtonWrapper, CartSpinnerWrapper } from './styles';
import { Button, Spinner, ProductQuantityList } from '../';

const Cart = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id || '';

  const { data, loading: queryLoading } = useQuery<Query, QueryFindUserArgs>(FIND_USER_BY_ID, {
    variables: {
      id: userId,
    },
    skip: !user,
  });
  const [userCartToOrder, { loading: mutationLoading }] = useMutation<Mutation, MutationCreateOrderFromUserCartArgs>(
    USER_CART_TO_ORDER,
    {
      variables: {
        userId,
      },
    }
  );

  const cart = data?.findUser?.user?.cart || [];

  const handleOrderSubmit = () => {
    userCartToOrder();
  };

  return (
    <CartWrapper>
      {queryLoading && (
        <CartSpinnerWrapper>
          <Spinner />
        </CartSpinnerWrapper>
      )}
      {cart && <ProductQuantityList items={cart} key={0} />}

      <CartButtonWrapper>
        {mutationLoading ? (
          <CartSpinnerWrapper>
            <Spinner />
          </CartSpinnerWrapper>
        ) : (
          cart?.length !== 0 && <Button onClick={handleOrderSubmit}>Submit Order</Button>
        )}
      </CartButtonWrapper>
    </CartWrapper>
  );
};

export default Cart;
