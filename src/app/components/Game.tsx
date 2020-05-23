import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';

import DrawTheWord from './DrawTheWord';
import { useGame } from '../state/GameContext';
import ViewDrawing from './ViewDrawing';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { Player, Book } from '../../types/models';
import { Banner } from './Banner';
import PickAWord from './PickAWord';
import ShowResults from './results/ShowResults';

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

  const drawnImage = '{"lines":[{"points":[{"x":203,"y":59.98333740234376},{"x":203,"y":59.98333740234376},{"x":182,"y":72.98333740234375},{"x":150,"y":101.98333740234375},{"x":131,"y":122.98333740234375},{"x":74.99999999999997,"y":299.98333740234375},{"x":101,"y":337.98333740234375},{"x":137,"y":356.98333740234375},{"x":254,"y":358.98333740234375},{"x":266,"y":353.98333740234375},{"x":277,"y":347.98333740234375},{"x":303,"y":323.98333740234375},{"x":309,"y":315.98333740234375},{"x":312,"y":310.98333740234375},{"x":315,"y":286.98333740234375},{"x":313,"y":276.98333740234375},{"x":310,"y":267.98333740234375},{"x":287,"y":217.98333740234375},{"x":279,"y":206.98333740234375},{"x":269,"y":200.98333740234375},{"x":264,"y":198.98333740234375},{"x":220,"y":219.98333740234372},{"x":210,"y":234.98333740234375},{"x":203,"y":247.98333740234375},{"x":191,"y":285.98333740234375},{"x":191,"y":287.98333740234375},{"x":211,"y":273.98333740234375},{"x":218,"y":257.98333740234375},{"x":219,"y":252.98333740234375},{"x":215,"y":192.98333740234375},{"x":208,"y":182.98333740234375},{"x":172,"y":128.98333740234375},{"x":168,"y":122.98333740234375},{"x":164,"y":118.98333740234375},{"x":155,"y":108.98333740234375},{"x":153,"y":110.98333740234375},{"x":153,"y":111.98333740234375}],"brushColor":"#444","brushRadius":10}],"width":400,"height":400}';
  const startImage = '{"lines":[{"points":[{"x":140,"y":91.4666748046875},{"x":140,"y":91.4666748046875},{"x":144,"y":83.4666748046875},{"x":145,"y":81.4666748046875},{"x":147,"y":76.4666748046875},{"x":157,"y":61.4666748046875},{"x":159,"y":60.4666748046875},{"x":159,"y":59.4666748046875},{"x":164,"y":59.4666748046875},{"x":165,"y":61.4666748046875},{"x":168,"y":80.4666748046875},{"x":168,"y":84.4666748046875},{"x":169,"y":87.4666748046875},{"x":169,"y":89.4666748046875},{"x":169,"y":100.4666748046875},{"x":169,"y":101.4666748046875}],"brushColor":"#444","brushRadius":10},{"points":[{"x":216,"y":100.4666748046875},{"x":216,"y":100.4666748046875},{"x":221,"y":70.4666748046875},{"x":224,"y":64.4666748046875},{"x":226,"y":61.4666748046875},{"x":229,"y":52.4666748046875},{"x":232,"y":65.4666748046875},{"x":233,"y":73.4666748046875},{"x":234,"y":77.4666748046875},{"x":239,"y":97.4666748046875},{"x":239,"y":99.4666748046875},{"x":241,"y":106.4666748046875}],"brushColor":"#444","brushRadius":10},{"points":[{"x":122,"y":183.4666748046875},{"x":122,"y":183.4666748046875},{"x":120,"y":189.4666748046875},{"x":119,"y":193.4666748046875},{"x":116,"y":224.4666748046875},{"x":121,"y":227.4666748046875},{"x":175,"y":211.4666748046875},{"x":183,"y":202.4666748046875},{"x":188,"y":196.4666748046875},{"x":192,"y":185.4666748046875},{"x":191,"y":185.4666748046875},{"x":191,"y":187.4666748046875},{"x":191,"y":197.4666748046875},{"x":210,"y":251.4666748046875},{"x":218,"y":256.4666748046875},{"x":223,"y":257.4666748046875},{"x":272,"y":229.4666748046875},{"x":275,"y":217.4666748046875},{"x":271,"y":164.4666748046875},{"x":271,"y":163.4666748046875}],"brushColor":"#444","brushRadius":10}],"width":400,"height":400}';

  const books: Book[] = [{
    owner: { id: '1', name: 'Myau' },
    startWord: 'katt',
    pages: [
      {
        startWord: 'katt',
        drawer: { id: '1', name: 'Miichu' },
        drawnImage: drawnImage,
      },
      {
        guesser: { id: '2', name: 'Espen' },
        startImage: startImage,
        guessedWord: 'cat'
      },
      {
        startWord: 'katt',
        drawer: { id: '1', name: 'Miichu' },
        drawnImage: drawnImage,
      },
      {
        guesser: { id: '2', name: 'Espen' },
        startImage: startImage,
        guessedWord: 'cat'
      }]
  },
  {
    owner: { id: '2', name: 'Espen' },
    startWord: 'hjerte',
    pages: [{
      startWord: 'hjerte',
      drawer: { id: '2', name: 'Espen' },
      drawnImage: drawnImage,
    },
    {
      guesser: { id: '1', name: 'Miichu' },
      startImage: startImage,
      guessedWord: 'ball'
    }]
  }
  ]

  return (
    <>
      <Banner />

      <PickAWord key={'cake'} words={words} player={game.players[0]} />

      <ShowResults books={books} />
    </>
  );
};

export default Game;
