import React from 'react';
import { HistoryGameWithTurnCount } from '../../interfaces/History/HistoryGame';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Card, CardActionArea, Typography, useTheme } from '@material-ui/core';
import { PlayerColor } from '../../interfaces/Game/Player';
import MatchHistoryPlayer from '../../components/MatchHistoryPlayer/MatchHistoryPlayer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface StyledCardProps {
  isWinner: boolean;
}

const StyledCardActionArea = styled(CardActionArea)<StyledCardProps>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-left: 5px solid
    ${props =>
      props.isWinner
        ? props.theme.palette.success.main
        : props.theme.palette.error.main};
  padding: ${props => props.theme.spacing(2)}px;
`;

const StyledBlackPlayer = styled(MatchHistoryPlayer)`
  margin-left: auto;
  flex-direction: row-reverse;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledGameTimeContainer = styled(Typography)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledDateContainer = styled(Typography)`
  text-align: right;
`;

const StyledCard = styled(Card)`
  max-width: 90%;
  width: 400px;
  margin: ${props => props.theme.spacing(2)}px auto;
`;

interface Props {
  game: HistoryGameWithTurnCount;
  login: string;
}

const MatchHistoryGame: React.FC<Props> = ({ game, login }) => {
  const history = useHistory();
  const theme = useTheme();
  const winningPlayerName =
    game.winner === PlayerColor.Black
      ? game.blackPlayerName
      : game.whitePlayerName;

  return (
    <StyledCard
      theme={theme}
      onClick={() => history.push(`/match-history/${game.gameId}`)}
    >
      <StyledCardActionArea
        isWinner={winningPlayerName === login}
        theme={theme}
      >
        <StyledDateContainer variant="subtitle2">
          {dayjs(game.finishTime).from(dayjs())}
        </StyledDateContainer>
        <StyledWrapper>
          <MatchHistoryPlayer
            name={game.whitePlayerName}
            isWinner={game.winner === PlayerColor.White}
          />
          <StyledGameTimeContainer theme={theme} variant="body1">
            <span>{game.totalTurns} Turns</span>
            <span>{game.duration.toFixed(2)}s</span>
          </StyledGameTimeContainer>
          <StyledBlackPlayer
            name={game.blackPlayerName}
            isWinner={game.winner === PlayerColor.Black}
          />
        </StyledWrapper>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default MatchHistoryGame;
