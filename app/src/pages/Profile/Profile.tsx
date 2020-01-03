import React from 'react';
import { ProfileContainerProps } from './Profile.container';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import UserImageForm from './UserImageForm/UserImageForm';

interface Props extends ProfileContainerProps {}

const Profile: React.FC<Props> = ({
  user,
  historyGames,
  getHistoryGames,
  isLoading,
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (historyGames.length <= 0) {
      getHistoryGames();
    }
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <span>{user.login}</span>
        <span>{user.email}</span>
        <UserImageForm user={user} />
      </div>
      <div>
        {historyGames.map(game => (
          <div
            key={game.gameId}
            onClick={() => history.push(`profile/game/${game.gameId}`)}
          >
            <span>{game.totalTurns}</span>
            <span>{game.whitePlayerName}</span>
            <span>{game.blackPlayerName}</span>
          </div>
        ))}
      </div>
    </Loader>
  );
};

export default Profile;
