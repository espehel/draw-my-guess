import React, { FC, useMemo } from 'react';
import { useGame } from '../state/GameContext';
import { isDrawing, isGuess } from '../../types/type-guards';
import DrawTheWord from './DrawTheWord';
import GuessTheDrawing from './GuessTheDrawing';

const ManageBooks: FC = () => {
  const { game, player } = useGame();

  const currentPage = useMemo(
    () =>
      game.books
        .map((book) => book.pages[book.pages.length - 1])
        .find((lastPage) => lastPage.actor.id === player.id),
    [game.books, player]
  );

  if (isDrawing(currentPage)) return <DrawTheWord page={currentPage} />;

  if (isGuess(currentPage)) return <GuessTheDrawing page={currentPage} />;

  return <p>This should not have happened</p>;
};

export default ManageBooks;
