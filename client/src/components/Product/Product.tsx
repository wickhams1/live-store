import { Product as ProductType } from '../../graphql/generated';
import { ProductWrapper, ProductButtonWrapper, Title, Quantity } from './styles';
import { Button } from '../';

interface Props extends ProductType {}

const Product = ({ name, availableQuantity }: Props) => {
  return (
    <ProductWrapper>
      <Title>{name}</Title>
      {typeof availableQuantity === 'number' && (
        <>
          <Quantity>Quantity: {availableQuantity}</Quantity>
          <ProductButtonWrapper>
            <Button>Add to Cart</Button>
          </ProductButtonWrapper>
        </>
      )}
    </ProductWrapper>
  );
};

export default Product;
