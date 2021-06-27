import styled, { css } from 'styled-components';
import { Theme } from '../../theme';

export const UserPanelWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const NavBar = styled.div`
  ${({ theme: { space, colours } }: { theme: Theme }) => css`
    width: 100%;
    height: ${space(9)};
    background-color: ${colours.lightGrey.shadow};
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
  `}
`;

export const NavButton = styled.div`
  ${({ theme: { space, colours }, active }: { theme: Theme; active: boolean }) => css`
    height: ${space(7)};
    background-color: ${active ? 'white' : colours.lightGrey.hover};
    margin: 0 ${space(1)};
    box-sizing: border-box;
    border-radius: ${space(2)} ${space(2)} 0 0;
    cursor: pointer;

    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `}
`;

export const PanelWrapper = styled.div`
  ${({ theme: { space, colours } }: { theme: Theme }) => css`
    width: 100%;
    padding: ${space(2)};
    box-sizing: border-box;
  `}
`;
