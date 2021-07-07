import { useState } from 'react';
import {
  NewProductModalWrapper,
  NewProductModalBackground,
  NewProductModalContainer,
  NewProductModalButtonsWrapper,
  NewProductModalButton,
  NewProductModalInput,
} from './styles';

const NewProductModal = ({ onCancel }: { onCancel: () => void }) => {
  const [productName, setProductName] = useState('');

  return (
    <NewProductModalWrapper>
      <NewProductModalBackground onClick={onCancel} />
      <NewProductModalContainer>
        <NewProductModalInput
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        ></NewProductModalInput>

        <NewProductModalButtonsWrapper>
          <NewProductModalButton onClick={onCancel}>Cancel</NewProductModalButton>
          <NewProductModalButton disabled={!productName}>Save</NewProductModalButton>
        </NewProductModalButtonsWrapper>
      </NewProductModalContainer>
    </NewProductModalWrapper>
  );
};

export default NewProductModal;
