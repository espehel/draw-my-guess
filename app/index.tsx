import React from 'react';
import { render } from 'react-dom';

import './less/main.less';
import App from './components/App';
import { GameProvider } from './state/GameContext';

const rootElement = document.querySelector('#root');

render(
    <GameProvider>
        <App />
    </GameProvider>, rootElement);
