import React from 'react';
import { HistoryGameWithTurnCount } from '../../interfaces/HistoryGame';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import { PlayerColor } from '../../interfaces/player';
import MatchHistoryPlayer from '../../components/MatchHistoryPlayer/MatchHistoryPlayer';
import { useTheme } from '@emotion/core';
import moment from 'moment';

interface StyledCardProps {
  isWinner: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>`
  display: flex;
  flex-direction: column;
  width: 400px;
  cursor: pointer;
  border-left: 5px solid
    ${props =>
      props.isWinner ? props.theme.colors.success : props.theme.colors.error};
  padding: ${props => props.theme.space.large}px;
  margin: ${props => props.theme.space.giga}px auto;
  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
  }
  max-width: 90%;
`;

const StyledBlackPlayer = styled(MatchHistoryPlayer)`
  margin-left: auto;
  flex-direction: row-reverse;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledGameTimeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.heading};
  flex-direction: column;
`;

const StyledDateContainer = styled.div`
  font-size: ${props => props.theme.fontSizes.small}px;
  text-align: right;
  font-weight: ${props => props.theme.fontWeights.heading};
  margin-bottom: ${props => props.theme.space.large}px;
`;

interface Props {
  game: HistoryGameWithTurnCount;
  login: string;
}

const MatchHistoryGame: React.FC<Props> = ({ game, login }) => {
  const history = useHistory();
  const theme = useTheme();
  const winningPlayerName =
    game.winner === PlayerColor.BLACK
      ? game.blackPlayerName
      : game.whitePlayerName;

  return (
    <StyledCard
      onClick={() => history.push(`/match-history/${game.gameId}`)}
      isWinner={winningPlayerName === login}
    >
      <StyledDateContainer>
        {moment(game.finishTime).fromNow()}
      </StyledDateContainer>
      <StyledWrapper>
        <MatchHistoryPlayer
          name={game.whitePlayerName}
          isWinner={game.winner === PlayerColor.WHITE}
        />
        <StyledGameTimeContainer theme={theme}>
          <span>{game.totalTurns} Turns</span>
          <span>{game.duration.toFixed(2)}s</span>
        </StyledGameTimeContainer>
        <StyledBlackPlayer
          name={game.blackPlayerName}
          isWinner={game.winner === PlayerColor.BLACK}
        />
      </StyledWrapper>
    </StyledCard>
  );
};

export default MatchHistoryGame;
