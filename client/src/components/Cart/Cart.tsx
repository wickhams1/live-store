import { useContext, useMemo } from 'react';
import { UserContext } from '../../contexts';
import { Product as ProductType } from '../../graphql/generated';
import { CartWrapper, ProductQuantityWrapper, QuantityWrapper, Divider, ProductDividerWrapper } from './styles';
import { Product } from '../';

interface ProductWithQuantity extends ProductType {
  quantity: number;
}

const Cart = () => {
  const { user } = useContext(UserContext);

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
    </CartWrapper>
  );
};

export default Cart;
