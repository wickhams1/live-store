import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { PRODUCT_CREATED } from '../../graphql/subscriptions';
import { Query, Subscription } from '../../graphql/generated';
import { Product, Spinner } from '../';
import { ProductListWrapper, ProductsListSpinnerWrapper } from './styles';
import { useEffect, useState } from 'react';

const Products = () => {
  const { loading, data, subscribeToMore } = useQuery<Query>(GET_PRODUCTS);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!subscribeToMore || initialised) return;

    setInitialised(true);

    subscribeToMore<Subscription>({
      document: PRODUCT_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newProduct = subscriptionData.data.productCreated;

        return Object.assign({}, prev, {
          getProducts: {
            products: [...(prev.getProducts?.products || []), newProduct],
          },
        });
      },
    });
  }, [subscribeToMore, initialised]);

  return (
    <ProductListWrapper>
      {loading && (
        <ProductsListSpinnerWrapper>
          <Spinner />
        </ProductsListSpinnerWrapper>
      )}

      {data?.getProducts?.products?.map((product) => product && <Product {...product} key={product.id} />)}
    </ProductListWrapper>
  );
};

export default Products;
