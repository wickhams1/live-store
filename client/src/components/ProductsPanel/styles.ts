import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const ProductsPanelWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

export const ProductsPanelHeadingWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    padding: ${space(2)};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const ProductsPanelButtonWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: ${space(15)};
    height: ${space(8)};
    box-sizing: border-box;
    margin-left: ${space(2)};
  `}
`;
