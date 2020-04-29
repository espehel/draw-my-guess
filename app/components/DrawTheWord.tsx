import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { useIsMobileOrTablet } from '../utils/isMobileOrTablet';

import Toolbox from './Toolbox';
import CenteredContainer from './ContainerCentered';
import LoadableCanvas from './LoadableCanvas';
import { getStorageKey } from '../utils/draw';

interface Props {
  playername: string;
  word: string;
}

const DrawTheWord: React.FC<Props> = ({ playername, word }) => {
  const isMobOrTab = useIsMobileOrTablet();
  const [canvas, setCanvas] = React.useState<any>({ lazyRadius: 0, });

  const storageKey = getStorageKey(playername, word);

  return (
    <CenteredContainer maxWidth={'sm'}>

      <Typography variant={'subtitle2'}>
        Use your {isMobOrTab ? 'finger' : 'mouse'} to draw{' '}
        <span role="img" aria-label="fingers pointing down">
          👇👇👇👇
        </span>
      </Typography>

      <CanvasDraw
        ref={canvasDraw => (setCanvas(canvasDraw))}
        lazyRadius={canvas?.lazyRadius ? canvas.lazyRadius : 0}
        style={{
          boxShadow:
            '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        }}
      />

      <Button
        variant={'contained'}
        onClick={() => canvas.clear()}
      >
        <Typography variant={'button'}>Clear</Typography>
      </Button>
      <Button
        variant={'contained'}
        onClick={() => canvas.undo()}
      >
        <Typography variant={'button'}>Undo</Typography>
      </Button>

      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => {
          localStorage.setItem(
            storageKey,
            canvas.getSaveData()
          );
        }}
      >
        <Typography variant={'button'}>Done / Save</Typography>
      </Button>
      <Toolbox />
      <LoadableCanvas canvas={canvas} storageKey={storageKey} />
    </CenteredContainer>
  );
};

export default DrawTheWord;
