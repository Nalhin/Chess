import React from 'react';
import { Avatar } from '@material-ui/core';
import { userImagePath } from '../../contants/userImagePath';

interface Props {
  name: string;
  className?: string;
  isThumbnail?: boolean;
}

const PlayerAvatar: React.FC<Props> = ({ name, className, isThumbnail }) => {
  const src = isThumbnail
    ? `${userImagePath}${name}_thumbnail.jpg`
    : `${userImagePath}${name}.jpg`;
  return (
    <Avatar className={className} alt={name} src={src}>
      {name[0].toUpperCase()}
    </Avatar>
  );
};

PlayerAvatar.defaultProps = {
  isThumbnail: false,
};

export default PlayerAvatar;
