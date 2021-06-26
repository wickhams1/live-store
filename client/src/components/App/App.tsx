import { ThemeProvider } from 'styled-components';
import { ProductsList, UserPanel, Divider } from '../';
import theme from '../../theme';
import { AppWrapper } from './styles';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <ProductsList />
          <Divider />
          <UserPanel />
        </AppWrapper>
      </ThemeProvider>
    </div>
  );
}

export default App;
