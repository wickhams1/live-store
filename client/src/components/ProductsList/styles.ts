import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: fit-content;
  overflow-y: scroll;
`;

export const ProductsListSpinnerWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: ${space(10)};
    height: ${space(10)};
  `}
`;
