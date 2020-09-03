import React, { FC } from 'react';
import { Guess } from '../../types/models';
import CanvasDraw from 'react-canvas-draw';
import { useGame } from '../state/GameContext';

interface Props {
  page: Guess;
}

const GuessTheDrawing: FC<Props> = ({ page }) => {
  const { isWaiting } = useGame();

  return <CanvasDraw disabled immediateLoading saveData={page.startImage} />;
};

export default GuessTheDrawing;
