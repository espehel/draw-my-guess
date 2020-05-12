import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Game from './components/Game';
import ChatPanel from './components/ChatPanel';
import { useConnectToSpace, useSpace } from './state/SpaceContext';
import CreateSpace from './components/CreateSpace';
import WaitingRoom from './components/WaitingRoom';
import { GameProvider } from './state/GameContext';

const useStyles = makeStyles({
  main: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
});

const App: FC = () => {
  const { connection, messages, space, player } = useSpace();
  const connectToSpace = useConnectToSpace();
  const classes = useStyles();

  const hasSpaceInUrl = location.pathname !== '/';
  const [isGameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (hasSpaceInUrl) {
      connectToSpace(location.pathname);
    }
  }, [hasSpaceInUrl]);

  if (!(connection || hasSpaceInUrl)) {
    return <CreateSpace />;
  }
  if (connection && space) {
    return (
      <article className={classes.main}>
        <WaitingRoom
          space={space}
          connection={connection}
          onStartGame={() => setGameStarted(true)}
        />
        {isGameStarted && player && (
          <GameProvider connection={connection} player={player}>
            <Game />
          </GameProvider>
        )}
        <ChatPanel messages={messages} onSendMessage={connection.sendMessage} />
      </article>
    );
  }
  return <p>Spinner?</p>;
};

export default App;
