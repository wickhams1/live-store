import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const ProductWrapper = styled.div`
  ${({ theme: { colours, space } }: { theme: Theme }) => css`
    box-shadow: 1px 1px 1px 1px ${colours.lightGrey.shadow};
    margin: ${space(2)};
    border-radius: ${space(2)};
    border: 1px solid ${colours.lightGrey.hover};
    width: 150px;
    height: 150px;
    padding: ${space(1)};

    :hover {
      background-color: ${colours.lightGrey.hover};
    }
  `}
`;
