import { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { ProductQuantityList } from '../';
import { Product as ProductType } from '../../graphql/generated';
import { OrdersWrapper, Divider, OrderDividerWrapper } from './styles';

interface ProductWithQuantity extends ProductType {
  quantity: number;
}

const Orders = () => {
  const { user } = useContext(UserContext);
  const [openOrder, setOpenOrder] = useState('');

  const orders = user?.orders;

  const numOrders = orders?.length;

  return (
    <OrdersWrapper>
      {orders?.map((order, index) => (
        <OrderDividerWrapper key={order.id}>
          <p onClick={() => setOpenOrder(openOrder === order.id ? '' : order.id)}>{order.id}</p>
          {openOrder === order.id && (
            <ProductQuantityList
              products={(() => {
                const products: ProductWithQuantity[] = [];

                order.items?.forEach((item) => {
                  if (!item) return;

                  const existingProduct = products.find((product) => product.id === item.product.id);
                  if (!existingProduct) {
                    products.push({ ...item.product, quantity: 1 });
                  } else {
                    existingProduct.quantity++;
                  }
                });

                return products;
              })()}
            />
          )}
          {numOrders && index + 1 < numOrders && <Divider vertical={false} />}
        </OrderDividerWrapper>
      ))}
    </OrdersWrapper>
  );
};

export default Orders;
