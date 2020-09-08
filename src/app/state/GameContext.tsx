import React, { useEffect, useState } from 'react';
import createUseContext from 'constate';
import { Book, Game, GameState, Player } from '../../types/models';
import { Connection } from '../api/Connection';
import { BroadcastType } from '../../types/api';
import { assignPlayers, hasAllBooks, insertDrawing } from '../utils/books';

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
    const [isWaiting, setWaiting] = useState(false);

    connection.onBroadcast((payload) => {
      switch (payload.type) {
        case BroadcastType.Drawing: {
          console.log(`Drawing from ${payload.drawing.actor}`);
          setGame(insertDrawing(payload.drawing));
          break;
        }
        case BroadcastType.Book: {
          const filteredBooks = game.books.filter(
            (book) => book.owner.id !== payload.book.owner.id
          );
          setGame({ ...game, books: [...filteredBooks, payload.book] });
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
          console.log(`Starting next round [${game.round + 1}]`);
          const assignedBooks = assignPlayers(game.books, players, game.round);
          connection.startRound(game.round + 1, assignedBooks);
        }
      }
    }, [isHost, game, players]);

    return { game, setGame, player, connection, isWaiting, setWaiting };
  }
);

export { GameProvider, useGame };
