import React from 'react';
import { PacmanLoader } from 'react-spinners';

interface Props {}

const QueueLoader: React.FC<Props> = () => {
  return <PacmanLoader loading={true} color={'#f2d648'} size={50} />;
};

export default QueueLoader;
