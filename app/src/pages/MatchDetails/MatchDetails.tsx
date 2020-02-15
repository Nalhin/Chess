import React from 'react';
import { MatchHistoryGameWithDetails } from '../../interfaces/MatchHistoryGame/MatchHistoryGameBase';
import { Card, List, Typography, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import MatchHistoryPlayer from '../../components/MatchHistoryPlayer/MatchHistoryPlayer';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MatchDetailsTurn from './MatchDetailsTurn';

dayjs.extend(relativeTime);

const StyledCard = styled(Card)`
  max-width: 90%;
  padding: ${props => props.theme.spacing(3)}px;
  width: 500px;
  margin: ${props => props.theme.spacing(2)}px auto;
`;

const StyledBlackPlayer = styled(MatchHistoryPlayer)`
  margin-left: auto;
  flex-direction: row-reverse;
`;

const StyledGameTimeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledDateContainer = styled(Typography)`
  text-align: right;
  padding-bottom: ${props => props.theme.spacing(1)}px;
`;

const StyledContainer = styled.div`
  display: flex;
`;

interface Props {
  game: MatchHistoryGameWithDetails;
  login: string;
}

const MatchDetails: React.FC<Props> = ({ game, login }) => {
  const theme = useTheme();
  return (
    <StyledCard theme={theme}>
      <StyledDateContainer variant="subtitle2" theme={theme}>
        {dayjs(game.finishTime).from(dayjs())}
      </StyledDateContainer>
      <StyledContainer>
        <MatchHistoryPlayer
          name={game.whitePlayer}
          isWinner={game.whitePlayer === login}
        />
        <StyledGameTimeContainer theme={theme}>
          <span>{game.turns.length} Turns</span>
          <span>{game.duration.toFixed(2)} s</span>
        </StyledGameTimeContainer>
        <StyledBlackPlayer
          name={game.blackPlayer}
          isWinner={game.blackPlayer === login}
        />
      </StyledContainer>
      <List>
        {game.turns.map(turn => (
          <MatchDetailsTurn
            turn={turn}
            whitePlayer={game.whitePlayer}
            blackPlayer={game.blackPlayer}
            key={turn.turnId}
          />
        ))}
      </List>
    </StyledCard>
  );
};

export default MatchDetails;
