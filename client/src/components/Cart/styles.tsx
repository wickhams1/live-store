import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const CartWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductDividerWrapper = styled.div`
  width: 100%;
`;

export const ProductQuantityWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const QuantityWrapper = styled.div`
  flex-grow: 1;
`;

export const Divider = styled.div`
  ${({ theme: { colours, space }, vertical = true }: { theme: Theme; vertical: boolean }) => css`
    width: ${vertical ? space(0.5) : '100%'};
    height: ${vertical ? '100%' : space(0.5)};
    background-color: ${colours.lightGrey.shadow};
  `}
`;

export const CartButtonWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    height: ${space(8)};
    margin: ${space(3)} 0;
  `}
`;
