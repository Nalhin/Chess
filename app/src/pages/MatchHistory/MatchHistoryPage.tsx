import React from 'react';
import Loader from '../../components/Loader/Loader';
import MatchHistoryGame from './MatchHistoryGame';
import { MatchHistoryContainerProps } from './MatchHistory.container';
import { Typography, useTheme } from '@material-ui/core';
import { StyledPageTitle } from '../../components/StyledPageTitle/StyledPageTitle';
import styled from '@emotion/styled';
import { Routes } from '../../interfaces/Router/Routes';

const StyledTypography = styled(Typography)`
  text-align: center;
`;

interface Props extends MatchHistoryContainerProps {}

const MatchHistoryPage: React.FC<Props> = ({
  matches,
  getMatchHistory,
  isLoading,
  user,
}) => {
  const [isDisplayed, setDisplayed] = React.useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    if (!matches.length && user.login) {
      getMatchHistory(user.login);
      setDisplayed(true);
    }
  }, [user.login]);

  const displayNoFound = !matches.length && isDisplayed && !isLoading;

  return (
    <Loader isLoading={isLoading}>
      <StyledPageTitle
        variant="h4"
        theme={theme}
        data-testid={Routes.matchHistory}
      >
        Match history
      </StyledPageTitle>
      {matches.map(match => (
        <MatchHistoryGame key={match.gameId} game={match} login={user.login} />
      ))}
      {displayNoFound && (
        <StyledTypography variant="body1">No matches found.</StyledTypography>
      )}
    </Loader>
  );
};

export default MatchHistoryPage;
