import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const CartWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CartButtonWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    height: ${space(8)};
    margin: ${space(3)} 0;
  `}
`;

export const CartSpinnerWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    height: ${space(4)};
    width: ${space(4)};
  `}
`;
