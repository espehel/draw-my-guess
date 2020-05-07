import React, { FC, useEffect } from 'react';
import Game from './components/Game';
import ChatPanel from './components/ChatPanel';
import { useConnectToSpace, useSpace } from './state/SpaceContext';
import CreateSpace from './components/CreateSpace';
import WaitingRoom from './components/WaitingRoom';

const App: FC = () => {
  const { connection, messages, space } = useSpace();
  const connectToSpace = useConnectToSpace();

  const hasSpaceInUrl = location.pathname !== '/';

  useEffect(() => {
    if (hasSpaceInUrl) {
      connectToSpace(location.pathname);
    }
  }, [hasSpaceInUrl]);

  if (!(connection || hasSpaceInUrl)) {
    return <CreateSpace />;
  }
  return (
    <article>
      {connection && space && (
        <>
          <ChatPanel
            messages={messages}
            onSendMessage={connection.sendMessage}
          />
          <WaitingRoom space={space} connection={connection} />
        </>
      )}
      <Game />
    </article>
  );
};

export default App;
