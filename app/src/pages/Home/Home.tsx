import React from 'react';
import { HomeContainerProps } from './Home.container';
import styled from '@emotion/styled';
import { Card, Typography, useTheme } from '@material-ui/core';
import Board from '../GameRoom/Game/Board/Board';
import { defaultBoardState } from './defaultBoardState';
import Queue from './Queue/Queue.container';
import Info from './Info';

const StyledContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const StyledHeader = styled(Typography)`
  padding: ${props => props.theme.spacing(3)}px 0
    ${props => props.theme.spacing(3)}px;
`;

const StyledBoardContainer = styled.div`
  position: relative;
`;

const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing(3)}px;
`;

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({ isAuthenticated, registerUser }) => {
  const theme = useTheme();

  return (
    <StyledContainer data-testid="home">
      <StyledHeader variant="h4" theme={theme}>
        Chess
      </StyledHeader>
      <StyledBoardContainer>
        <Board
          boardState={defaultBoardState}
          getAvailableMoves={null}
          selectedPosition={null}
          makeMove={null}
          availableMoves={[]}
          checkState={null}
          currentPlayerColor={null}
          userColor={null}
          latestMove={{
            destinationPosition: { x: -1, y: -1 },
            initialPosition: { x: -1, y: -1 },
          }}
        />
        <StyledCard theme={theme}>
          <Typography variant="h6">Play!</Typography>
          {isAuthenticated ? <Queue /> : <Info registerUser={registerUser} />}
        </StyledCard>
      </StyledBoardContainer>
    </StyledContainer>
  );
};

export default Home;
