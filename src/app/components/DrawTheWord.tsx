import React, { FC, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { useIsMobileOrTablet } from '../utils/isMobileOrTablet';

import CenteredContainer from './CenteredContainer';
import { useGame } from '../state/GameContext';
import { Drawing } from '../../types/models';

interface Props {
  page: Drawing;
}

const DrawTheWord: FC<Props> = ({ page }) => {
  const { connection, player } = useGame();

  const isMobOrTab = useIsMobileOrTablet();
  const canvasRef = useRef<CanvasDraw>(null);

  const onSaveDrawing = () => {
    const canvas = canvasRef.current?.getSaveData();
    if (canvas) {
      const drawing: Drawing = {
        startWord: page.startWord,
        drawer: player,
        drawnImage: canvas,
      };
      connection.sendDrawing(drawing);
    } else {
      console.log('No canvas');
    }
  };

  return (
    <CenteredContainer maxWidth={'sm'}>
      <Typography variant={'h5'}>{` ${page.drawer.name}`}</Typography>
      <Typography
        variant={'h5'}
      >{`Draw the word, ${page.startWord}`}</Typography>

      <Typography variant={'subtitle2'}>
        Use your {isMobOrTab ? 'finger' : 'mouse'} to draw{' '}
        <span role="img" aria-label="fingers pointing down">
          👇👇👇👇
        </span>
      </Typography>

      <CanvasDraw
        ref={canvasRef}
        lazyRadius={0}
        style={{
          boxShadow:
            '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        }}
      />

      <Button variant={'contained'} onClick={canvasRef.current?.clear}>
        <Typography variant={'button'}>Clear</Typography>
      </Button>
      <Button variant={'contained'} onClick={canvasRef.current?.undo}>
        <Typography variant={'button'}>Undo</Typography>
      </Button>

      <Button variant={'contained'} color={'primary'} onClick={onSaveDrawing}>
        <Typography variant={'button'}>Send drawing</Typography>
      </Button>
    </CenteredContainer>
  );
};

export default DrawTheWord;
