import React, { FC, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Typography } from '@material-ui/core';
import { Drawing } from '../../types/models';

interface Props {
  drawing: Drawing;
}
const ViewDrawing: FC<Props> = ({ drawing }) => {
  const { canvas, word, artist } = drawing;
  const [loadableCanvas, setLoadableCanvas] = useState<CanvasDraw | null>();
  return (
    <>
      <Typography variant={'h5'}>
        {artist} drawing of {word}
      </Typography>
      <CanvasDraw
        disabled
        ref={(canvasDraw) => setLoadableCanvas(canvasDraw)}
        saveData={canvas}
      />
    </>
  );
};

export default ViewDrawing;
