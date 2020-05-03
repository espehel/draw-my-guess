import React, { FC } from 'react';
import Game from './components/Game';
import ChatPanel from './components/ChatPanel';
import { useConnectToSpace, useSpace } from './state/SpaceContext';

const App: FC = () => {
  const { connection, messages } = useSpace();
  useConnectToSpace();
  return (
    <article>
      {connection && (
        <ChatPanel messages={messages} onSendMessage={connection.sendMessage} />
      )}
      <Game />
    </article>
  );
};

export default App;
