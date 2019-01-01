import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import RunnerListTable from './modules/RunnerListTable/';
import VisibilityTracker from './components/VisibilityTracker';
import theme from '../theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Header />
      <VisibilityTracker>
        {isVisible => <RunnerListTable isVisible={isVisible} />}
      </VisibilityTracker>
    </div>
  </ThemeProvider>
);

export default App;
