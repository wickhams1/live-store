import { ProductsList, Button } from '../';
import { ProductsPanelWrapper, ProductsPanelHeadingWrapper, ProductsPanelButtonWrapper } from './styles';

const ProductsPanel = () => {
  return (
    <ProductsPanelWrapper>
      <ProductsPanelHeadingWrapper>
        <h1>Products</h1>
        <ProductsPanelButtonWrapper>
          <Button>New Product</Button>
        </ProductsPanelButtonWrapper>
      </ProductsPanelHeadingWrapper>
      <ProductsList />
    </ProductsPanelWrapper>
  );
};

export default ProductsPanel;
