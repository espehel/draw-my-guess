import React, { FC, useEffect, useState } from 'react';
import Game from './components/Game';
import ChatPanel from './components/ChatPanel';
import { Connection } from './api/sockets';

const App: FC = () => {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [connection, setConnection] = useState<Connection>();

  useEffect(() => {
    setConnection(Connection.setupConnection({ setMessages }));
  }, []);
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
