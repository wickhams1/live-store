import styled, { css } from 'styled-components';
import { Theme } from '../../theme';
import { ProductWrapper } from '../Product/styles';
import { Button } from '../';

export const NewProductModalWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewProductModalBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;

  opacity: 0.5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewProductModalContainer = styled(ProductWrapper)`
  z-index: 15;
`;

export const NewProductModalInput = styled.input`
  ${({ theme: { size, space } }: { theme: Theme }) => css`
    font-size: ${size.medium};
    margin: ${space(2)} 0;
    text-align: center;
    font-weight: bold;
  `}
`;

export const NewProductModalButtonsWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  input {
    margin-top: 50px;
  }
`;

export const NewProductModalButton = styled(Button)`
  flex-grow: 1;
  flex-basis: 0;
  height: auto;
  margin: 0 5px;
`;
