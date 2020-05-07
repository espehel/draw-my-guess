import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';

import DrawTheWord from './DrawTheWord';
import { useGame } from '../state/GameContext';
import ViewDrawing from './ViewDrawing';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { Player } from '../../types/models';

const StyledDrawings = styled.div`
  display: flex;
  justify-content: center;
`;

const Game: FC = () => {
  const { game } = useGame();

  return (
    <>
      <Typography variant="h2">Draw my Guess</Typography>
      {game.players.map((player: Player) => (
        <DrawTheWord key={player.id} player={player} />
      ))}

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
