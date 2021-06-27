import { useState, useContext } from 'react';
import { UserContext } from '../../contexts';
import { UserPanelWrapper, NavBar, NavButton, PanelWrapper } from './styles';
import { CreateAccountForm, LoginForm } from '../';

enum ActivePanel {
  LOGIN = 'LOGIN',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
}

const UserPanel = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>(ActivePanel.CREATE_ACCOUNT);
  const { loggedIn } = useContext(UserContext);

  return (
    <UserPanelWrapper>
      <NavBar>
        {loggedIn ? (
          <div />
        ) : (
          <>
            <NavButton
              onClick={() => setActivePanel(ActivePanel.CREATE_ACCOUNT)}
              active={activePanel === ActivePanel.CREATE_ACCOUNT}
            >
              Create Account
            </NavButton>
            <NavButton onClick={() => setActivePanel(ActivePanel.LOGIN)} active={activePanel === ActivePanel.LOGIN}>
              Login
            </NavButton>
          </>
        )}
      </NavBar>

      <PanelWrapper>
        {!loggedIn && (activePanel === ActivePanel.CREATE_ACCOUNT ? <CreateAccountForm /> : <LoginForm />)}
      </PanelWrapper>
    </UserPanelWrapper>
  );
};

export default UserPanel;
