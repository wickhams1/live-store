import { useState } from 'react';
import { ProductsList, Button, NewProductModal } from '../';
import { ProductsPanelWrapper, ProductsPanelHeadingWrapper, ProductsPanelButtonWrapper } from './styles';

const ProductsPanel = () => {
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  return (
    <ProductsPanelWrapper>
      {showNewProductModal && <NewProductModal onCancel={() => setShowNewProductModal(false)} />}

      <ProductsPanelHeadingWrapper>
        <h1>Products</h1>
        <ProductsPanelButtonWrapper>
          <Button onClick={() => setShowNewProductModal(true)}>New Product</Button>
        </ProductsPanelButtonWrapper>
      </ProductsPanelHeadingWrapper>
      <ProductsList />
    </ProductsPanelWrapper>
  );
};

export default ProductsPanel;
