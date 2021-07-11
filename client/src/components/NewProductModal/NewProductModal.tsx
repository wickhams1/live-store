import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/queries';
import {
  NewProductModalWrapper,
  NewProductModalBackground,
  NewProductModalContainer,
  NewProductModalButtonsWrapper,
  NewProductModalButton,
  NewProductModalForm,
  NewProductModalInput,
  NewProductModalSpinnerWrapper,
} from './styles';
import { Spinner } from '../';
import { Mutation, MutationCreateProductArgs } from '../../graphql/generated';

const NewProductModal = ({ onCancel }: { onCancel: () => void }) => {
  const [productName, setProductName] = useState('');

  const [createProduct, { loading }] = useMutation<Mutation, MutationCreateProductArgs>(CREATE_PRODUCT, {
    variables: {
      product: { name: productName },
    },
    update(cache, { data }) {
      const newProduct = data?.createProduct?.product;

      cache.modify({
        fields: {
          getProducts({ products = [] }) {
            const newProductRef = cache.writeFragment({
              data: newProduct,
              fragment: gql`
                fragment NewProduct on Product {
                  id
                  name
                  availableQuantity
                }
              `,
            });
            return [...products, newProductRef];
          },
        },
      });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName) return;

    createProduct().then(() => {
      onCancel();
    });
  };

  const cancelHandler = () => {
    if (!loading) onCancel();
  };

  return (
    <NewProductModalWrapper id="form1">
      <NewProductModalBackground onClick={cancelHandler} />
      <NewProductModalContainer>
        <NewProductModalForm id="form1" onSubmit={onSubmit}>
          <NewProductModalInput
            placeholder="Product Name"
            value={productName}
            disabled={loading}
            onChange={(e) => setProductName(e.target.value)}
          ></NewProductModalInput>
        </NewProductModalForm>

        {loading && (
          <NewProductModalSpinnerWrapper>
            <Spinner />
          </NewProductModalSpinnerWrapper>
        )}

        <NewProductModalButtonsWrapper>
          <NewProductModalButton disabled={loading} onClick={cancelHandler}>
            Cancel
          </NewProductModalButton>
          <NewProductModalButton disabled={loading || !productName} type="submit" onClick={onSubmit} form="form1">
            Save
          </NewProductModalButton>
        </NewProductModalButtonsWrapper>
      </NewProductModalContainer>
    </NewProductModalWrapper>
  );
};

export default NewProductModal;
