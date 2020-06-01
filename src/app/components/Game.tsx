import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';

import DrawTheWord from './DrawTheWord';
import { useGame } from '../state/GameContext';
import ViewDrawing from './ViewDrawing';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { GameState, Player } from '../../types/models';
import { Banner } from './Banner';
import PickAWord from './PickAWord';
import { useSpace } from '../state/SpaceContext';
import ManageBooks from './ManageBooks';

const StyledDrawings = styled.div`
  display: flex;
  justify-content: center;
`;

const Game: FC = () => {
  const { game } = useGame();
  const { players } = useSpace();
  const words = [
    'ryggsekk',
    'couch',
    'concert',
    'sheep',
    'friend',
    'plant',
    'cake',
  ];

  return (
    <>
      <Banner />

      {game.state === GameState.PickingWord && <PickAWord words={words} />}

      {game.state === GameState.Live && <ManageBooks />}

      <Typography variant="h2">Drawings</Typography>
      <StyledDrawings>
        {game.drawings.map((drawing, i) => (
          <Container key={i}>
            <ViewDrawing drawing={drawing} />
          </Container>
        ))}
      </StyledDrawings>
    </>
  );
};

export default Game;
