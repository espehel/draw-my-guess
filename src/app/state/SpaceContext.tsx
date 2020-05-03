import React, { useEffect, useState } from 'react';
import createUseContext from 'constate';
import { Space } from '../../types/models';
import { Connection } from '../api/sockets';
import { SocketEvent } from '../../types/enums';

const [SpaceProvider, useSpace] = createUseContext(() => {
  const [game, setGame] = useState<Space>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const [connection, setConnection] = useState<Connection>();

  return { game, setGame, connection, setConnection, messages, setMessages };
});

export const useConnectToSpace = () => {
  const { setConnection, setMessages } = useSpace();
  return useEffect(() => {
    const connection = Connection.setupConnection(location.pathname);
    connection.on(SocketEvent.Welcome, (message: string) => {
      console.log(`${SocketEvent.Welcome}: ${message}`);
      setMessages((messages) => [...messages, message]);
    });
    connection.on(SocketEvent.NewPlayer, (message: string) => {
      console.log(`${SocketEvent.NewPlayer}: ${message}`);
      setMessages((messages) => [...messages, message]);
    });
    connection.on(SocketEvent.ChatMessage, (message: string) => {
      console.log(`${SocketEvent.ChatMessage}: ${message}`);
      setMessages((messages) => [...messages, message]);
    });
    setConnection(connection);
  }, []);
};

export { SpaceProvider, useSpace };
