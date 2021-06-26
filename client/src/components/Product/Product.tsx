import { ProductWrapper } from './styles';

interface Props {
  name: string;
}

const Product = ({ name }: Props) => {
  return (
    <ProductWrapper>
      <p>{name}</p>
    </ProductWrapper>
  );
};

export default Product;
