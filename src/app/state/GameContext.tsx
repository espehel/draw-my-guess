import React, { useEffect, useState } from 'react';
import createUseContext from 'constate';
import { Book, Game, GameState, Player } from '../../types/models';
import { Connection } from '../api/Connection';
import { BroadcastType } from '../../types/api';
import { assignPlayers, hasAllBooks } from '../utils/books';

const initialState: Game = {
  drawings: [],
  books: [],
  state: GameState.PickingWord,
  round: -1,
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

    connection.onBroadcast((payload) => {
      switch (payload.type) {
        case BroadcastType.Drawing: {
          console.log(`Drawing from ${payload.drawing.actor}`);
          setGame({ ...game, drawings: [...game.drawings, payload.drawing] });
          break;
        }
        case BroadcastType.Book: {
          setGame({ ...game, books: [...game.books, payload.book] });
          break;
        }
        case BroadcastType.StartRound: {
          setGame({
            ...game,
            books: payload.books,
            state: GameState.Live,
            round: payload.round,
          });
          break;
        }
      }
    });

    useEffect(() => {
      if (isHost) {
        if (hasAllBooks(game.books, players, game.round)) {
          const assignedBooks = assignPlayers(game.books, players, game.round);
          connection.startRound(0, assignedBooks);
        }
      }
    }, [isHost, game, players]);

    return { game, setGame, player, connection };
  }
);

export { GameProvider, useGame };
