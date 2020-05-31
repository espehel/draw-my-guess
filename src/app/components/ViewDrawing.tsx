import React, { FC } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Typography } from '@material-ui/core';
import { Drawing } from '../../types/models';

interface Props {
  drawing: Drawing;
}
const ViewDrawing: FC<Props> = ({ drawing }) => {
  const { startWord, drawnImage, drawer } = drawing;
  return (
    <>
      <Typography variant={'h5'}>
        {drawer} drawing of {startWord}
      </Typography>
      <CanvasDraw disabled immediateLoading saveData={drawnImage} />
    </>
  );
};

export default ViewDrawing;
