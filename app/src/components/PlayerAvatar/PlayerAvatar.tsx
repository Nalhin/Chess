import React from 'react';
import { Avatar } from '@material-ui/core';
import { userImagePath } from '../../contants/userImagePath';

interface Props {
  name: string;
  className?: string;
  isThumbnail?: boolean;
  variant?: 'circle' | 'rounded' | 'square';
}

const PlayerAvatar: React.FC<Props> = ({
  name,
  className,
  isThumbnail,
  variant,
}) => {
  const src = isThumbnail
    ? `${userImagePath}${name}_thumbnail.jpg`
    : `${userImagePath}${name}.jpg`;
  return (
    <Avatar className={className} alt={name} src={src} variant={variant}>
      {name ? name[0].toUpperCase() : ''}
    </Avatar>
  );
};

PlayerAvatar.defaultProps = {
  isThumbnail: false,
};

export default PlayerAvatar;
