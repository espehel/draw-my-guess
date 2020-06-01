import React, { FC } from 'react';
import { Guess } from '../../types/models';
import CanvasDraw from 'react-canvas-draw';

interface Props {
  page: Guess;
}

const GuessTheDrawing: FC<Props> = ({ page }) => {
  return <CanvasDraw disabled immediateLoading saveData={page.startImage} />;
};

export default GuessTheDrawing;
