import { ThemeProvider } from 'styled-components';
import { ProductsPanel, UserPanel, Divider } from '../';
import theme from '../../theme';
import { AppWrapper, AppProductsPanelWrapper } from './styles';
import { UserContextProvider } from '../../contexts';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <AppWrapper>
            <AppProductsPanelWrapper>
              <ProductsPanel />
            </AppProductsPanelWrapper>

            <Divider />

            <UserPanel />
          </AppWrapper>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
