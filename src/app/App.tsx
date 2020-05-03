import React, { FC } from 'react';
import Game from './components/Game';
import ChatPanel from './components/ChatPanel';
import { useSpace } from './state/SpaceContext';
import CreateGame from './components/CreateSpace';

const App: FC = () => {
  const { connection, messages } = useSpace();
  if (!connection) {
    return <CreateGame />;
  }
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
