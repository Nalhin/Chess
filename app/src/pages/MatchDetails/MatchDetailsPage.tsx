import React from 'react';
import { IndividualGameHistoryContainerProps } from './MatchDetailsPage.container';
import Loader from '../../components/Loader/Loader';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Typography, useTheme } from '@material-ui/core';
import MatchDetails from './MatchDetails';
import styled from '@emotion/styled';
import { StyledPageTitle } from '../../components/StyledPageTitle/StyledPageTitle';
import { Routes } from '../../interfaces/Router/Routes';

const StyledContainer = styled(Loader)`
  margin: 0 auto;
  position: relative;
`;

const StyledBackIcon = styled(IconButton)`
  position: absolute;
  left: ${props => props.theme.spacing(1)}px;
  top: ${props => props.theme.spacing(0.5)}px;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;

interface Props extends IndividualGameHistoryContainerProps {}

const MatchDetailsPage: React.FC<Props> = ({
  isLoading,
  matchDetails,
  getMatchDetails,
  shouldDisplayBackButton,
  user,
}) => {
  const theme = useTheme();
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();
  const [isDisplayed, setDisplayed] = React.useState(false);
  const id = Number(match.params.id);
  const selectedMatchDetails = matchDetails[id];
  const displayNoFound = !selectedMatchDetails && isDisplayed && !isLoading;

  React.useEffect(() => {
    if (!selectedMatchDetails && user.login) {
      getMatchDetails(id);
      setDisplayed(true);
    }
  }, [id, user.login]);

  const onIconClick = () => {
    history.goBack();
  };

  return (
    <StyledContainer isLoading={isLoading}>
      <StyledPageTitle
        variant="h4"
        theme={theme}
        data-testid={`${Routes.matchDetails}id`}
      >
        Match details
      </StyledPageTitle>
      {shouldDisplayBackButton && (
        <StyledBackIcon
          onClick={onIconClick}
          color="inherit"
          theme={theme}
          aria-label="go back"
        >
          <ArrowBackIcon />
        </StyledBackIcon>
      )}
      {selectedMatchDetails && (
        <MatchDetails game={selectedMatchDetails} login={user.login} />
      )}
      {displayNoFound && (
        <StyledTypography variant="body1">Match not found.</StyledTypography>
      )}
    </StyledContainer>
  );
};

export default MatchDetailsPage;
