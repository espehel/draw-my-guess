import React, { useEffect, useState } from 'react';
import createUseContext from 'constate';
import { Drawing, Game, GameState, Player } from '../../types/models';
import { Connection } from '../api/Connection';
import { BroadcastType } from '../../types/api';
import { assignPlayers, hasAllBooks } from '../utils/books';

const initialState: Game = {
  drawings: [],
  books: [],
  state: GameState.PickingWord,
};

interface Props {
  connection: Connection;
  player: Player;
  players: Array<Player>;
  isHost: boolean;
}

const [GameProvider, useGame] = createUseContext(
  ({ connection, player, players, isHost }: Props) => {
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
        case BroadcastType.Book: {
          setGame({ ...game, books: [...game.books, payload.book] });
          break;
        }
        case BroadcastType.AssignedBooks: {
          setGame({
            ...game,
            books: payload.assignedBooks,
            state: GameState.Live,
          });
          break;
        }
      }
    });

    useEffect(() => {
      if (isHost && game.state === GameState.PickingWord) {
        if (hasAllBooks(game.books, players)) {
          const assignedBooks = assignPlayers(game.books, players);
          connection.sendAssignedBooks(assignedBooks);
        }
      }
    }, [isHost, game, players]);

    return { game, setGame, sendDrawing, player, connection };
  }
);

export { GameProvider, useGame };
