import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './less/main.less';
import App from './App';
import { SpaceProvider } from './state/SpaceContext';

const rootElement = document.querySelector('#root');

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '50px',
      },
      h2: {
        fontSize: '35px',
      },
      h3: {
        fontSize: '25px',
      },
    },
  },
});

render(
  <ThemeProvider theme={theme}>
    <SpaceProvider>
      <App />
    </SpaceProvider>
  </ThemeProvider>,
  rootElement
);
