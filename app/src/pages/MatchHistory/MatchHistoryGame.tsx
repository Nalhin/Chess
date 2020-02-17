import React from 'react';
import { MatchHistoryGameWithTurnCount } from '../../interfaces/MatchHistoryGame/MatchHistoryGameBase';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { Card, CardActionArea, Typography, useTheme } from '@material-ui/core';
import { PlayerColor } from '../../interfaces/Game/Player';
import MatchHistoryPlayer from '../../components/MatchHistoryPlayer/MatchHistoryPlayer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import mixins from '../../styles/mixins';
import { Routes } from '../../interfaces/Router/Routes';

dayjs.extend(relativeTime);

interface StyledCardProps {
  isWinner: boolean;
}

const StyledCardActionArea = styled(CardActionArea, {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'isWinner',
})<StyledCardProps>`
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
  ${mixins.flexCenter};
  flex-direction: column;
`;

const StyledDateContainer = styled(Typography)`
  text-align: right;
  padding-bottom: ${props => props.theme.spacing(1)}px;
`;

const StyledCard = styled(Card)`
  max-width: 90%;
  width: 400px;
  margin: ${props => props.theme.spacing(2)}px auto;
`;

interface Props {
  game: MatchHistoryGameWithTurnCount;
  login: string;
}

const MatchHistoryGame: React.FC<Props> = ({ game, login }) => {
  const history = useHistory();
  const theme = useTheme();

  const winnerColor =
    game.winner == game.blackPlayer ? PlayerColor.Black : PlayerColor.White;

  const redirectToMatchDetails = () => {
    history.push(`${Routes.matchDetails}${game.gameId}`);
  };

  return (
    <StyledCard theme={theme} onClick={redirectToMatchDetails}>
      <StyledCardActionArea isWinner={game.winner === login} theme={theme}>
        <StyledDateContainer variant="subtitle2" theme={theme}>
          {dayjs(game.finishTime).from(dayjs())}
        </StyledDateContainer>
        <StyledWrapper>
          <MatchHistoryPlayer
            name={game.whitePlayer}
            isWinner={winnerColor === PlayerColor.White}
          />
          <StyledGameTimeContainer theme={theme} variant="body1">
            <span>{game.totalTurns} Turns</span>
            <span>{game.duration.toFixed(2)} s</span>
          </StyledGameTimeContainer>
          <StyledBlackPlayer
            name={game.blackPlayer}
            isWinner={winnerColor === PlayerColor.Black}
          />
        </StyledWrapper>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default MatchHistoryGame;
