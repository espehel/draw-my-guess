import React, { FC, useMemo } from 'react';
import { useGame } from '../state/GameContext';
import { isDrawing } from '../../types/type-guards';
import DrawTheWord from './DrawTheWord';
import GuessTheDrawing from './GuessTheDrawing';

const ManageBooks: FC = () => {
  const { game, player } = useGame();

  const currentPage = useMemo(
    () =>
      game.books
        .map((book) => book.pages[book.pages.length - 1])
        .find((lastPage) => {
          return isDrawing(lastPage)
            ? lastPage.drawer.id === player.id
            : lastPage.guesser.id === player.id;
        }),
    [game.books, player]
  );

  if (!currentPage) {
    return <p>This should not have happened</p>;
  }

  return isDrawing(currentPage) ? (
    <DrawTheWord page={currentPage} />
  ) : (
    <GuessTheDrawing page={currentPage} />
  );
};

export default ManageBooks;
