import React from 'react';
import Typography from '@material-ui/core/Typography';

import DrawTheWord from './components/DrawTheWord';
import { useGame } from './state/GameContext';
import { IPlayer } from './models/player';
import ViewDrawing from './components/ViewDrawing';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const StyledDrawings = styled.div`
display: flex;
justify-content: center;

`;

const App: React.FC = () => {
  const { game } = useGame();


  return (
    <>
      <Typography variant="h2">Draw my Guess</Typography>
      {game.players.map((player: IPlayer) => (
        <DrawTheWord key={player.id} player={player} />
      ))}

      <Typography variant="h2">Drawings</Typography>
      <StyledDrawings>
        {game.drawings.map(drawing => (
          <Container>
            <ViewDrawing key={drawing.id} drawing={drawing} />
          </Container>
        ))}
      </StyledDrawings>
    </>
  );
};

export default App;
