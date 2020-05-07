import React, { FC, useState } from 'react';
import { Space } from '../../types/models';
import { useSpace } from '../state/SpaceContext';
import { Connection } from '../api/Connection';

interface Props {
  space: Space;
  connection: Connection;
}

const WaitingRoom: FC<Props> = ({ connection, space }) => {
  const { players, isHost, player, setPlayer } = useSpace();
  const [nickname, setNickname] = useState(isHost ? space.host.name : '');

  if (isHost) {
    return (
      <article>
        <h1>Draw my Guess</h1>
        <h2>Welcome, {nickname}!</h2>
        <p>Share the link with your friends so they can join the game!</p>
        <a
          href={`${window.location.origin}/${space.id}`}
        >{`${window.location.origin}/${space.id}`}</a>
        <h3>Friends who are here..</h3>
        {players.map((player) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </article>
    );
  }

  return (
    <article>
      <h1>Draw my Guess</h1>
      <h2>Welcome</h2>
      {!player && (
        <>
          <p>Set a nickname</p>
          <input onChange={(event) => setNickname(event.target.value)} />
          <button
            onClick={() => {
              connection.joinGame(nickname);
              setPlayer({ id: connection.socket.id, name: nickname });
            }}
          >
            I'm ready!
          </button>
        </>
      )}
      {player && <p>Waiting for {players[0]?.name} to start the game</p>}
    </article>
  );
};

export default WaitingRoom;
