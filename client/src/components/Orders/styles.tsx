import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const OrdersWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderDividerWrapper = styled.div`
  width: 100%;
`;

export const Divider = styled.div`
  ${({ theme: { colours, space }, vertical = true }: { theme: Theme; vertical: boolean }) => css`
    width: ${vertical ? space(0.5) : '100%'};
    height: ${vertical ? '100%' : space(0.5)};
    background-color: ${colours.lightGrey.shadow};
  `}
`;
