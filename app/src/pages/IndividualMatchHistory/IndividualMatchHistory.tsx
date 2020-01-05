import React from 'react';
import { IndividualGameHistoryContainerProps } from './IndividualMatchHistory.container';
import Loader from '../../components/Loader/Loader';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import IndividualMatch from './IndividualMatch';

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

const StyledBackIcon = styled(IconButton)`
  margin-left: ${props => props.theme.space.small}px;
`;

interface Props extends IndividualGameHistoryContainerProps {}

const IndividualMatchHistory: React.FC<Props> = ({
  isLoading,
  individualGames,
  getHistoryGameById,
  shouldDisplayBackButton,
}) => {
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();
  const id = Number(match.params.id);
  const individualGame = individualGames[id];

  React.useEffect(() => {
    if (!individualGame) {
      getHistoryGameById(id);
    }
  }, [id]);

  const onIconClick = () => {
    history.goBack();
  };

  return (
    <StyledLoader isLoading={isLoading}>
      {shouldDisplayBackButton && (
        <StyledBackIcon onClick={onIconClick} color="inherit">
          <ArrowBackIcon />
        </StyledBackIcon>
      )}

      {individualGame && <IndividualMatch game={individualGame} />}
    </StyledLoader>
  );
};

export default IndividualMatchHistory;
