import { Product as ProductType } from '../../graphql/generated';
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

const ProductQuantityList = ({ products }: { products: ProductWithQuantity[] }) => {
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
