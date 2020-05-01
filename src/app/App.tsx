import React, { FC, useEffect } from 'react';
import Game from './components/Game';
import { setupConnection } from './api/sockets';

const App: FC = () => {
  useEffect(() => {
    setupConnection();
  }, []);
  return <Game />;
};

export default App;
