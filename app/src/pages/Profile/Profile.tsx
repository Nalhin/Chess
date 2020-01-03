import React from 'react';
import { ProfileContainerProps } from './Profile.container';
import UserImageForm from './UserImageForm/UserImageForm';
import MatchHistoryGames from './MatchHistory/MatchHistoryGames';

interface Props extends ProfileContainerProps {}

const Profile: React.FC<Props> = ({
  user,
  historyGames,
  getHistoryGames,
  isHistoryLoading,
  addToast,
}) => {
  return (
    <div>
      <div>
        <span>{user.login}</span>
        <span>{user.email}</span>
        <UserImageForm user={user} addToast={addToast} />
      </div>
      <MatchHistoryGames
        login={user.login}
        historyGames={historyGames}
        getHistoryGames={getHistoryGames}
        isLoading={isHistoryLoading}
      />
    </div>
  );
};

export default Profile;
