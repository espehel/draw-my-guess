import React from 'react';
import { render } from 'react-dom';

import './less/main.less';
import App from './App';
import { SpaceProvider } from './state/SpaceContext';

const rootElement = document.querySelector('#root');

render(
  <SpaceProvider>
    <App />
  </SpaceProvider>,
  rootElement
);
