import React, { useState } from 'react';
import createUseContext from 'constate';
import { Drawing, Game, Player } from '../../types/models';
import { Connection } from '../api/Connection';
import { SocketEvent } from '../../types/enums';

const initialState: Game = {
  players: [
    { id: '1', name: 'Myau', word: '' },
    { id: '2', name: 'Espen', word: '' },
  ],
  drawings: [],
  books: []
};

interface Props {
  connection: Connection;
  player: Player;
}

const [GameProvider, useGame] = createUseContext(
  ({ connection, player }: Props) => {
    const [game, setGame] = useState<Game>(initialState);
    const [word, setWord] = useState<string>();

    const sendDrawing = (drawing: Drawing) => {
      console.log('sending drawing');
      connection.sendDrawing(drawing);
    };

    connection.on(SocketEvent.Drawing, (drawing: Drawing) => {
      console.log(`${SocketEvent.Drawing}: Drawing from ${drawing.drawer}`);
      setGame({ ...game, drawings: [...game.drawings, drawing] });
    });

    return { game, setGame, sendDrawing, player, setWord, word };
  }
);

export { GameProvider, useGame };
