import React, { useState } from 'react';
import createUseContext from 'constate';
import { Drawing, Game } from '../../types/models';
import { Connection } from '../api/Connection';
import { SocketEvent } from '../../types/enums';

const initialState: Game = {
  players: [
    { id: '1', name: 'Myau', word: 'cat' },
    { id: '2', name: 'Espen', word: 'dog' },
  ],
  drawings: [],
};

interface Props {
  connection: Connection;
}

const [GameProvider, useGame] = createUseContext(({ connection }: Props) => {
  const [game, setGame] = useState<Game>(initialState);

  const sendDrawing = (drawing: Drawing) => {
    console.log('sending drawing');
    connection.sendDrawing(drawing);
  };

  connection.on(SocketEvent.Drawing, (drawing: Drawing) => {
    console.log(`${SocketEvent.Drawing}: Drawing from ${drawing.artist}`);
    setGame({ ...game, drawings: [...game.drawings, drawing] });
  });

  return { game, setGame, sendDrawing };
});

export { GameProvider, useGame };
