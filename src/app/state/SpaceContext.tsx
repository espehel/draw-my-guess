import React, { useCallback, useState } from 'react';
import createUseContext from 'constate';
import { Player, Space } from '../../types/models';
import { Connection } from '../api/Connection';
import { BroadcastType, SocketEvent } from '../../types/api';

const [SpaceProvider, useSpace] = createUseContext(() => {
  const [space, setSpace] = useState<Space>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const [connection, setConnection] = useState<Connection>();
  const [players, setPlayers] = useState<Array<Player>>([]);
  const isHost = space?.host.id === connection?.socket.id;
  const [player, setPlayer] = useState<Player>();
  const [isGameStarted, setGameStarted] = useState(false);

  return {
    space,
    setSpace,
    connection,
    setConnection,
    messages,
    setMessages,
    players,
    setPlayers,
    player,
    setPlayer,
    isHost,
    isGameStarted,
    setGameStarted,
  };
});

export const useConnectToSpace = () => {
  const {
    setConnection,
    setMessages,
    setPlayers,
    setSpace,
    setGameStarted,
  } = useSpace();
  return useCallback((path: string) => {
    const connection = new Connection(path);

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

    connection.onBroadcast((payload) => {
      switch (payload.type) {
        case BroadcastType.ChatMessage: {
          console.log(`${BroadcastType.ChatMessage}: ${payload.message}`);
          setMessages((messages) => [...messages, payload.message]);
        }
        case BroadcastType.StartGame: {
          setMessages((messages) => [...messages, `Starting game...`]);
          setGameStarted(true);
        }
      }
    });

    setConnection(connection);
  }, []);
};

export { SpaceProvider, useSpace };
