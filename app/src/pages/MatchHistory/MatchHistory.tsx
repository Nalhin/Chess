import React from 'react';
import Loader from '../../components/Loader/Loader';
import { HistoryGameWithTurnCount } from '../../interfaces/HistoryGame';
import MatchHistoryGame from './MatchHistoryGame';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledLoader = styled(Loader)`
  padding-top: ${props => props.theme.space.giga}px;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-weight: ${props => props.theme.fontWeights.heading};
  font-size: ${props => props.theme.fontSizes.larger}px;
  padding-bottom: ${props => props.theme.space.medium}px;
`;

interface Props {
  historyGames: HistoryGameWithTurnCount[];
  getHistoryGames: () => void;
  isLoading: boolean;
  login: string;
}

const MatchHistory: React.FC<Props> = ({
  historyGames,
  getHistoryGames,
  isLoading,
  login,
}) => {
  const theme = useTheme();

  React.useEffect(() => {
    if (historyGames.length <= 0) {
      getHistoryGames();
    }
  }, []);

  return (
    <StyledLoader isLoading={isLoading} theme={theme}>
      <StyledHeader>Previous matches</StyledHeader>
      {historyGames.map(game => (
        <MatchHistoryGame key={game.gameId} game={game} login={login} />
      ))}
    </StyledLoader>
  );
};

export default MatchHistory;
