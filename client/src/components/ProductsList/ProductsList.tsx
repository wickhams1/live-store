import { Product } from '../';
import { ProductListWrapper } from './styles';

const productsData = [
  {
    id: '1142r2r2',
    name: 'First Product',
  },
  {
    id: '4124142c',
    name: 'Second Product',
  },
];

const Products = () => {
  return (
    <ProductListWrapper>
      {productsData.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </ProductListWrapper>
  );
};

export default Products;
