import React, { FC } from 'react';
import { useGame } from '../state/GameContext';
import { GameState, Book } from '../../types/models';
import { Banner } from './Banner';
import { mockBooks } from '../mock/testData';
import PickAWord from './PickAWord';
import ManageBooks from './ManageBooks';
import ShowResults from './results/ShowResults';

const Game: FC = () => {
  const { game } = useGame();
  const words = [
    'ryggsekk',
    'couch',
    'concert',
    'sheep',
    'friend',
    'plant',
    'cake',
  ];
  const books: Book[] = mockBooks;

  return (
    <>
      <Banner />

      {game.state === GameState.PickingWord && <PickAWord words={words} />}

      {game.state === GameState.Live && <ManageBooks />}

      {game.state === GameState.Results && <ShowResults books={books} />}
    </>
  );
};

export default Game;
