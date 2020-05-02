import React, { FC, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { useIsMobileOrTablet } from '../utils/isMobileOrTablet';

import CenteredContainer from './ContainerCentered';
import { getStorageKey } from '../utils/draw';
import { useGame } from '../state/GameContext';
import { Player } from '../../types/models';

interface Props {
  player: Player;
}

const DrawTheWord: FC<Props> = ({ player }) => {
  const { id, name, word } = player;
  const { game, setGame } = useGame();
  const isMobOrTab = useIsMobileOrTablet();
  const [canvas, setCanvas] = useState<any>({ lazyRadius: 0 });

  const saveDrawing = () => {
    let drawings = game.drawings;
    drawings.push({
      id: getStorageKey(id, name, word),
      word: word,
      artist: name,
      canvas: canvas.getSaveData(),
    });
    setGame({ ...game, drawings: drawings });
  };

  return (
    <CenteredContainer maxWidth={'sm'}>
      <Typography variant={'h5'}>{` ${player.name}`}</Typography>
      <Typography variant={'h5'}>{`Draw the word, ${word}`}</Typography>

      <Typography variant={'subtitle2'}>
        Use your {isMobOrTab ? 'finger' : 'mouse'} to draw{' '}
        <span role="img" aria-label="fingers pointing down">
          👇👇👇👇
        </span>
      </Typography>

      <CanvasDraw
        ref={(canvasDraw) => setCanvas(canvasDraw)}
        lazyRadius={canvas?.lazyRadius ? canvas.lazyRadius : 0}
        style={{
          boxShadow:
            '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        }}
      />

      <Button variant={'contained'} onClick={() => canvas.clear()}>
        <Typography variant={'button'}>Clear</Typography>
      </Button>
      <Button variant={'contained'} onClick={() => canvas.undo()}>
        <Typography variant={'button'}>Undo</Typography>
      </Button>

      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => saveDrawing()}
      >
        <Typography variant={'button'}>Save drawing</Typography>
      </Button>
    </CenteredContainer>
  );
};

export default DrawTheWord;
