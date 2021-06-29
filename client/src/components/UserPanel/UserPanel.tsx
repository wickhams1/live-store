import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts';
import { UserPanelWrapper, NavBar, NavButton, PanelWrapper } from './styles';
import { CreateAccountForm, LoginForm, Cart, Orders } from '../';

enum ActivePanel {
  LOGIN = 'LOGIN',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  CART = 'CART',
  ORDERS = 'ORDERS',
}

const UserPanel = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>();
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    setActivePanel(loggedIn ? ActivePanel.CART : ActivePanel.CREATE_ACCOUNT);
  }, [loggedIn]);

  const Panel = () => {
    switch (activePanel) {
      case ActivePanel.LOGIN:
        return <LoginForm />;
      case ActivePanel.CREATE_ACCOUNT:
        return <CreateAccountForm />;
      case ActivePanel.CART:
        return <Cart />;
      case ActivePanel.ORDERS:
        return <Orders />;
      default:
        return <div />;
    }
  };

  return (
    <UserPanelWrapper>
      <NavBar>
        {loggedIn ? (
          <>
            <NavButton onClick={() => setActivePanel(ActivePanel.CART)} active={activePanel === ActivePanel.CART}>
              Cart
            </NavButton>
            <NavButton onClick={() => setActivePanel(ActivePanel.ORDERS)} active={activePanel === ActivePanel.ORDERS}>
              Orders
            </NavButton>
          </>
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
        <Panel />
      </PanelWrapper>
    </UserPanelWrapper>
  );
};

export default UserPanel;
