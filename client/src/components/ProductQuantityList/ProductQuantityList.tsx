import { useMemo } from 'react';
import { Item, Product as ProductType } from '../../graphql/generated';
import {
  ProductQuantityListWrapper,
  ProductQuantityWrapper,
  QuantityWrapper,
  Divider,
  ProductDividerWrapper,
} from './styles';
import { Product } from '..';

interface ProductWithQuantity extends ProductType {
  quantity: number;
}

const ProductQuantityList = ({ items }: { items: Item[] }) => {
  const products = useMemo(() => {
    const products: ProductWithQuantity[] = [];

    items?.forEach((item) => {
      const existingProduct = products.find((product) => product.id === item.product.id);
      if (!existingProduct) {
        products.push({ ...item.product, quantity: 1 });
      } else {
        existingProduct.quantity++;
      }
    });

    return products;
  }, [items]);

  const numProducts = products.length;

  return (
    <ProductQuantityListWrapper>
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
    </ProductQuantityListWrapper>
  );
};

export default ProductQuantityList;
