import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Query } from '../../graphql/generated';
import { Product } from '../';
import { ProductListWrapper } from './styles';

const Products = () => {
  const { data } = useQuery<Query>(GET_PRODUCTS);

  return (
    <ProductListWrapper>
      {data?.getProducts?.products?.map((product) => product && <Product {...product} key={product.id} />)}
    </ProductListWrapper>
  );
};

export default Products;
