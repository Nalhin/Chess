import React from 'react';
import { IndividualGameHistoryContainerProps } from './IndividualMatchHistory.container';
import Loader from '../../components/Loader/Loader';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

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
    <Loader isLoading={isLoading}>
      {shouldDisplayBackButton && (
        <IconButton onClick={onIconClick} color="inherit">
          <ArrowBackIcon />
        </IconButton>
      )}
      <div>
        {individualGame?.turns.map(turn => (
          <div key={turn.turnId}>
            <span>{turn.pieceType}</span>
            <span>{turn.pieceType}</span>
          </div>
        ))}
      </div>
    </Loader>
  );
};

export default IndividualMatchHistory;
