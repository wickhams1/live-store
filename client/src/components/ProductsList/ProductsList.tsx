import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Query } from '../../graphql/generated';
import { Product, Spinner } from '../';
import { ProductListWrapper, SpinnerWrapper } from './styles';

const Products = () => {
  const { loading, data } = useQuery<Query>(GET_PRODUCTS);

  return (
    <ProductListWrapper>
      {loading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}

      {data?.getProducts?.products?.map((product) => product && <Product {...product} key={product.id} />)}
    </ProductListWrapper>
  );
};

export default Products;
