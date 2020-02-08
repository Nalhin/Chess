import React from 'react';
import Loader from '../../components/Loader/Loader';
import MatchHistoryGame from './MatchHistoryGame';
import styled from '@emotion/styled';
import { MatchHistoryContainerProps } from './MatchHistory.container';
import { Typography, useTheme } from '@material-ui/core';

const StyledLoader = styled(Loader)`
  padding-top: ${props => props.theme.spacing(4)}px;
`;

const StyledHeader = styled(Typography)`
  text-align: center;
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
      <StyledHeader variant="h4">Previous matches</StyledHeader>
      {historyGames.map(game => (
        <MatchHistoryGame key={game.gameId} game={game} login={user.login} />
      ))}
    </StyledLoader>
  );
};

export default MatchHistory;
