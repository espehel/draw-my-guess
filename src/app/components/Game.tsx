import React, { FC } from 'react';

import { Banner } from './Banner';
import { Book } from '../../types/models';
import { mockBooks } from '../mock/testData';
import { useGame } from '../state/GameContext';
import PickAWord from './PickAWord';
import ShowResults from './results/ShowResults';
import styled from 'styled-components';

const StyledDrawings = styled.div`
  display: flex;
  justify-content: center;
`;

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

      <PickAWord key={'cake'} words={words} player={game.players[0]} />

      <ShowResults books={books} />
    </>
  );
};

export default Game;
