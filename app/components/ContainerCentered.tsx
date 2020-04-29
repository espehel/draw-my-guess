import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const StyledCenteredContainer = styled.div`
  display: flex;

`;


interface Props {
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
const CenteredContainer: React.FC<Props> = ({ maxWidth, disableGutters, fixed, children }) => {
  return (
    <StyledCenteredContainer>
      <Container maxWidth={maxWidth} disableGutters={disableGutters} fixed={fixed}>{children}</Container>
    </StyledCenteredContainer>
  )
}

export default CenteredContainer;