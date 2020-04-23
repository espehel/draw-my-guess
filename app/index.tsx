import React from 'react';
import { render } from 'react-dom';

import './less/main.less';
import App from './components/App';

const rootElement = document.querySelector('#root');

render(<App />, rootElement);
