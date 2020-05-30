import React, { useState } from 'react';
import createUseContext from 'constate';
import { Drawing, Game, Player } from '../../types/models';
import { Connection } from '../api/Connection';
import { BroadcastType } from '../../types/api';

const initialState: Game = {
  players: [
    { id: '1', name: 'Myau', word: '' },
    { id: '2', name: 'Espen', word: '' },
  ],
  drawings: [],
  books: [],
};

interface Props {
  connection: Connection;
  player: Player;
}

const [GameProvider, useGame] = createUseContext(
  ({ connection, player }: Props) => {
    const [game, setGame] = useState<Game>(initialState);

    const sendDrawing = (drawing: Drawing) => {
      console.log('sending drawing');
      connection.sendDrawing(drawing);
    };

    connection.onBroadcast((payload) => {
      switch (payload.type) {
        case BroadcastType.Drawing: {
          console.log(`Drawing from ${payload.drawing.drawer}`);
          setGame({ ...game, drawings: [...game.drawings, payload.drawing] });
          break;
        }
      }
    });

    return { game, setGame, sendDrawing, player, connection };
  }
);

export { GameProvider, useGame };
