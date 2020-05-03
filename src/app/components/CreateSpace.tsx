import React, { FC, useEffect, useState } from 'react';
import { Connection } from '../api/Connection';
import { createSpace } from '../api/space';
import { useConnectToSpace } from '../state/SpaceContext';

const CreateGame: FC = () => {
  const [connection, setConnection] = useState<Connection>();
  const [nickname, setNickname] = useState();
  const connectToSpace = useConnectToSpace();

  useEffect(() => {
    Connection.setupConnection('/').then(setConnection);
  }, []);

  if (!connection) {
    return <p>spinner...</p>;
  }

  return (
    <article>
      <h1>Draw my Guess</h1>
      <p>Set a nickname</p>
      <input onChange={(event) => setNickname(event.target.value)} />
      <button
        onClick={async () => {
          const space = await createSpace({
            hostName: nickname,
            hostId: connection.socket.id,
          });
          connectToSpace(`/${space.id}`);
        }}
      >
        Create game
      </button>
    </article>
  );
};

export default CreateGame;
