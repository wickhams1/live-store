import { ThemeProvider } from 'styled-components';
import { ProductsList } from '../';
import theme from '../../theme';

import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ProductsList />
      </ThemeProvider>
    </div>
  );
}

export default App;
