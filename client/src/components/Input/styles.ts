import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledLabel = styled.label`
  ${({ theme: { space, size } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    text-align: start;
    margin-bottom: ${space(1)};
    font-size: ${size.small};
  `}
`;

export const StyledInput = styled.input`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    height: ${space(6)};
  `}
`;
