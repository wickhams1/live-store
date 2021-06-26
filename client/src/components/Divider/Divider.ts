import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

const Divider = styled.div`
  ${({ theme: { colours, space }, vertical = true }: { theme: Theme; vertical?: boolean }) => css`
    width: ${vertical ? space(1) : '100%'};
    height: ${vertical ? '100%' : space(1)};
    background-color: ${colours.lightGrey.shadow};
  `}
`;

export default Divider;
