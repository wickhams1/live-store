import { useContext, useMemo, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { USER_CART_TO_ORDER } from '../../graphql/queries';
import { UserContext } from '../../contexts';
import { Product as ProductType, Mutation } from '../../graphql/generated';
import {
  CartWrapper,
  ProductQuantityWrapper,
  QuantityWrapper,
  Divider,
  ProductDividerWrapper,
  CartButtonWrapper,
} from './styles';
import { Product, Button, Spinner } from '../';

interface ProductWithQuantity extends ProductType {
  quantity: number;
}

const Cart = () => {
  const { user } = useContext(UserContext);
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const cart = user?.cart;

  const products = useMemo(() => {
    const products: ProductWithQuantity[] = [];

    cart?.forEach((item) => {
      const existingProduct = products.find((product) => product.id === item.product.id);
      if (!existingProduct) {
        products.push({ ...item.product, quantity: 1 });
      } else {
        existingProduct.quantity++;
      }
    });

    return products;
  }, [cart]);

  const numProducts = products.length;

  const handleOrderSubmit = () => {
    client
      .mutate<Mutation>({
        mutation: USER_CART_TO_ORDER,
        variables: {
          userId: user?.id,
        },
      })
      .then(() => setLoading(false));
    setLoading(true);
  };

  return (
    <CartWrapper>
      {products?.map((product, index) => (
        <ProductDividerWrapper key={product.id}>
          <ProductQuantityWrapper>
            <Product {...product} key={product.id} />
            <QuantityWrapper>
              <p>x {product.quantity}</p>
            </QuantityWrapper>
          </ProductQuantityWrapper>
          {index + 1 < numProducts && <Divider vertical={false} />}
        </ProductDividerWrapper>
      ))}
      <CartButtonWrapper>
        {loading ? <Spinner /> : <Button onClick={handleOrderSubmit}>Submit Order</Button>}
      </CartButtonWrapper>
    </CartWrapper>
  );
};

export default Cart;
