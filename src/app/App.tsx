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
  const {
    connection,
    messages,
    space,
    player,
    players,
    isGameStarted,
    isHost,
  } = useSpace();
  const connectToSpace = useConnectToSpace();
  const classes = useStyles();

  const hasSpaceInUrl = location.pathname !== '/';

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
        <ChatPanel messages={messages} onSendMessage={connection.sendMessage} />
        {isGameStarted && player ? (
          <GameProvider
            connection={connection}
            player={player}
            players={players}
            isHost={isHost}
          >
            <Game />
          </GameProvider>
        ) : (
            <WaitingRoom space={space} connection={connection} />
          )}
      </article>
    );
  }
  return <p>Spinner?</p>;
};

export default App;
