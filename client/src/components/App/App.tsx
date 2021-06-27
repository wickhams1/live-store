import { ThemeProvider } from 'styled-components';
import { ProductsList, UserPanel, Divider } from '../';
import theme from '../../theme';
import { AppWrapper, AppProductsListWrapper } from './styles';
import { UserContextProvider } from '../../contexts';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <AppWrapper>
            <AppProductsListWrapper>
              <ProductsList />
            </AppProductsListWrapper>

            <Divider />

            <UserPanel />
          </AppWrapper>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
