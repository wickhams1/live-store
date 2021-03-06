import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const LoginFormWrapper = styled.form`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    padding: ${space(4)} ${space(2)};
    box-sizing: border-box;
    border: 1px dashed black;
    border-radius: ${space(2)};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const LoginFormInputWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    margin: ${space(3)} 0;
  `}
`;

export const LoginFormButtonWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: 100%;
    box-sizing: border-box;
    height: ${space(8)};
    margin: ${space(3)} 0;
  `}
`;

export const LoginFormSpinnerWrapper = styled.div`
  ${({ theme: { space } }: { theme: Theme }) => css`
    width: ${space(4)};
    height: ${space(4)};
  `}
`;
