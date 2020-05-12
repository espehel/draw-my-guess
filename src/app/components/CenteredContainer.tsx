import React, { FC } from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const StyledCenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const CenteredContainer: FC<Props> = ({
  maxWidth,
  disableGutters,
  fixed,
  children,
}) => {
  return (
    <StyledCenteredContainer>
      <Container
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        fixed={fixed}
      >
        {children}
      </Container>
    </StyledCenteredContainer>
  );
};

export default CenteredContainer;
