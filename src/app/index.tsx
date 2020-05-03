import React from 'react';
import { render } from 'react-dom';

import './less/main.less';
import App from './App';
import { GameProvider } from './state/GameContext';
import { SpaceProvider } from './state/SpaceContext';

const rootElement = document.querySelector('#root');

render(
  <SpaceProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </SpaceProvider>,
  rootElement
);
