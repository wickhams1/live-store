import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const ProductWrapper = styled.div`
  ${({ theme: { colours, space } }: { theme: Theme }) => css`
    box-sizing: border-box;
    box-shadow: 1px 1px 1px 1px ${colours.lightGrey.shadow};
    margin: ${space(2)};
    border-radius: ${space(2)};
    border: 1px solid ${colours.lightGrey.hover};
    width: 150px;
    height: 150px;
    padding: ${space(1)} ${space(2)};
    padding-bottom: ${space(3)};

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    :hover {
      background-color: ${colours.lightGrey.hover};
    }
  `}
`;

export const ProductButtonWrapper = styled.div`
  ${({ theme: { colours, space } }: { theme: Theme }) => css`
    height: ${space(4)};

    :hover {
      background-color: ${colours.lightGrey.hover};
    }
  `}
`;

export const Title = styled.h4`
  ${({ theme: { size, space } }: { theme: Theme }) => css`
    font-size: ${size.medium};
    margin-bottom: 0px;
  `}
`;

export const Quantity = styled.p`
  ${({ theme: { size, space } }: { theme: Theme }) => css`
    font-size: ${size.small};
    margin: 0px;
  `}
`;
