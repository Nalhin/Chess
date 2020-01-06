import React from 'react';
import Button from '../../../../components/Button/Button';

interface Props {
  forfeitGame: () => void;
}

const ForfeitGame: React.FC<Props> = ({ forfeitGame }) => {
  return <Button onClick={forfeitGame}>Forfeit</Button>;
};

export default ForfeitGame;
