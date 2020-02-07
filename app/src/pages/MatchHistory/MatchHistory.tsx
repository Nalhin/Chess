import React from 'react';
import Loader from '../../components/Loader/Loader';
import MatchHistoryGame from './MatchHistoryGame';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import { MatchHistoryContainerProps } from './MatchHistory.container';

const StyledLoader = styled(Loader)`
  padding-top: ${props => props.theme.space.giga}px;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-weight: ${props => props.theme.fontWeights.heading};
  font-size: ${props => props.theme.fontSizes.larger}px;
  padding-bottom: ${props => props.theme.space.medium}px;
`;

interface Props extends MatchHistoryContainerProps {}

const MatchHistory: React.FC<Props> = ({
  historyGames,
  getHistoryGames,
  isLoading,
  user,
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
        <MatchHistoryGame key={game.gameId} game={game} login={user.login} />
      ))}
    </StyledLoader>
  );
};

export default MatchHistory;
