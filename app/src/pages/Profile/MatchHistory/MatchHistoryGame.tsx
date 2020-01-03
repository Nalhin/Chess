import React from 'react';
import { HistoryGameWithTurnCount } from '../../../interfaces/MatchGame';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import { PlayerColor } from '../../../interfaces/player';
import MatchHistoryPlayer from './MatchHistoryPlayer';

interface StyledCardProps {
  isWinner: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>`
  display: flex;
  flex-direction: row;
  background-image: linear-gradient(315deg, #2d3436 0%, #d3d3d3 74%);
  &:hover {
    background-image: linear-gradient(315deg, #2d3436dd 0%, #d3d3d3dd 74%);
  }
  width: 300px;
  cursor: pointer;
  border-left: 5px solid
    ${props =>
      props.isWinner ? props.theme.colors.success : props.theme.colors.error};
  padding: ${props => props.theme.space.large}px;
  margin: ${props => props.theme.space.giga}px auto;
`;

const StyledBlackPlayer = styled(MatchHistoryPlayer)`
  margin-left: auto;
  flex-direction: row-reverse;
`;

interface Props {
  game: HistoryGameWithTurnCount;
  login: string;
}

const MatchHistoryGame: React.FC<Props> = ({ game, login }) => {
  const history = useHistory();

  const winningPlayerName =
    game.winner === PlayerColor.BLACK
      ? game.blackPlayerName
      : game.whitePlayerName;

  return (
    <StyledCard
      onClick={() => history.push(`/profile/game/${game.gameId}`)}
      isWinner={winningPlayerName === login}
    >
      <MatchHistoryPlayer
        name={game.whitePlayerName}
        isWinner={game.winner === PlayerColor.WHITE}
      />
      <StyledBlackPlayer
        name={game.blackPlayerName}
        isWinner={game.winner === PlayerColor.BLACK}
      />
    </StyledCard>
  );
};

export default MatchHistoryGame;
