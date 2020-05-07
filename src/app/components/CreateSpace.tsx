import React, { FC, useEffect, useState } from 'react';
import { Connection } from '../api/Connection';
import { createSpace } from '../api/space';
import { useConnectToSpace, useSpace } from '../state/SpaceContext';

const CreateSpace: FC = () => {
  const [connection, setConnection] = useState<Connection>();
  const [nickname, setNickname] = useState('');
  const connectToSpace = useConnectToSpace();
  const { setPlayer } = useSpace();

  useEffect(() => {
    setConnection(Connection.setupConnection('/'));
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
          setPlayer({ id: space.host.id, name: nickname });
          connectToSpace(`/${space.id}`);
        }}
      >
        Create game
      </button>
    </article>
  );
};

export default CreateSpace;
