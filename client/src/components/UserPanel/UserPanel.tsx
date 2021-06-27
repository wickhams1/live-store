import { useState } from 'react';
import { UserPanelWrapper, NavBar, NavButton } from './styles';
import { CreateAccountForm, LoginForm } from '../';

enum ActivePanel {
  LOGIN = 'LOGIN',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
}

const UserPanel = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>(ActivePanel.CREATE_ACCOUNT);

  return (
    <UserPanelWrapper>
      <NavBar>
        <NavButton
          onClick={() => setActivePanel(ActivePanel.CREATE_ACCOUNT)}
          active={activePanel === ActivePanel.CREATE_ACCOUNT}
        >
          Create Account
        </NavButton>
        <NavButton onClick={() => setActivePanel(ActivePanel.LOGIN)} active={activePanel === ActivePanel.LOGIN}>
          Login
        </NavButton>
      </NavBar>
      {activePanel === ActivePanel.CREATE_ACCOUNT ? <CreateAccountForm /> : <LoginForm />}
    </UserPanelWrapper>
  );
};

export default UserPanel;
