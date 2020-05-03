import React, { useCallback, useState } from 'react';
import createUseContext from 'constate';
import { Player, Space } from '../../types/models';
import { Connection } from '../api/Connection';
import { SocketEvent } from '../../types/enums';

const [SpaceProvider, useSpace] = createUseContext(() => {
  const [space, setSpace] = useState<Space>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const [connection, setConnection] = useState<Connection>();
  const [players, setPlayers] = useState<Array<Player>>([]);
  const isHost = space?.host.id === connection?.socket.id;
  const isInGame = players.some(
    (player) => player.id === connection?.socket.id
  );
  return {
    space,
    setSpace,
    connection,
    setConnection,
    messages,
    setMessages,
    players,
    setPlayers,
    isHost,
    isInGame,
  };
});

export const useConnectToSpace = () => {
  const { setConnection, setMessages, setPlayers, setSpace } = useSpace();
  return useCallback((path: string) => {
    const connection = Connection.setupConnection(path);

    connection.on(SocketEvent.Welcome, (space: Space) => {
      console.log(`${SocketEvent.Welcome}: Connected to ${space.id}`);
      setSpace(space);
    });

    connection.on(
      SocketEvent.NewPlayer,
      (name: string, players: Array<Player>) => {
        console.log(`${SocketEvent.NewPlayer}: ${name}`);
        setMessages((messages) => [
          ...messages,
          `${name} has joined the game.`,
        ]);
        setPlayers(players);
      }
    );

    connection.on(SocketEvent.ChatMessage, (message: string) => {
      console.log(`${SocketEvent.ChatMessage}: ${message}`);
      setMessages((messages) => [...messages, message]);
    });
    setConnection(connection);
  }, []);
};

export { SpaceProvider, useSpace };
