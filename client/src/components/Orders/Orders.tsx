import { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { useQuery } from '@apollo/client';
import { GET_USER_ORDERS } from '../../graphql/queries';
import { Query, QueryGetUserCartArgs } from '../../graphql/generated';
import { ProductQuantityList } from '../';
import { OrdersWrapper, Divider, OrderDividerWrapper } from './styles';

const Orders = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id || '';

  const [openOrder, setOpenOrder] = useState('');

  const { data } = useQuery<Query, QueryGetUserCartArgs>(GET_USER_ORDERS, {
    variables: {
      userId,
    },
    skip: !user,
  });

  const orders = data?.getUserOrders?.orders || [];

  const numOrders = orders?.length;

  return (
    <OrdersWrapper>
      {orders?.map((order, index) => (
        <OrderDividerWrapper key={order.id}>
          <p onClick={() => setOpenOrder(openOrder === order.id ? '' : order.id)}>{order.id}</p>
          {openOrder === order.id && <ProductQuantityList items={order.items} />}
          {numOrders && index + 1 < numOrders && <Divider vertical={false} />}
        </OrderDividerWrapper>
      ))}
    </OrdersWrapper>
  );
};

export default Orders;
