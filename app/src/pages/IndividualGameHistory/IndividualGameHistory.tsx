import React from 'react';
import { IndividualGameHistoryContainerProps } from './IndividualGameHistory.container';
import Loader from '../../components/Loader/Loader';
import { useRouteMatch } from 'react-router-dom';

interface Props extends IndividualGameHistoryContainerProps {}

const IndividualGameHistory: React.FC<Props> = ({
  isLoading,
  individualGames,
  getHistoryGameById,
}) => {
  const match = useRouteMatch<{ id: string }>();
  const id = Number(match.params.id);
  const individualGame = individualGames[id];

  React.useEffect(() => {
    if (!individualGame) {
      getHistoryGameById(id);
    }
  }, [id]);

  return (
    <Loader isLoading={isLoading}>
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

export default IndividualGameHistory;
