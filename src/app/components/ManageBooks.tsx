import React, { FC, useMemo, useState } from 'react';
import { useGame } from '../state/GameContext';
import { isDrawing, isGuess } from '../../types/type-guards';
import DrawTheWord from './DrawTheWord';
import GuessTheDrawing from './GuessTheDrawing';
import Waiting from './Waiting';

const ManageBooks: FC = () => {
  const { game, player, isWaiting } = useGame();

  const currentPage = useMemo(
    () =>
      game.books
        .map((book) => book.pages[book.pages.length - 1])
        .find((lastPage) => lastPage.actor.id === player.id),
    [game.books, player]
  );

  if (isWaiting) return <Waiting />;

  if (isDrawing(currentPage)) return <DrawTheWord page={currentPage} />;

  if (isGuess(currentPage)) return <GuessTheDrawing page={currentPage} />;

  return <p>This should not have happened</p>;
};

export default ManageBooks;
