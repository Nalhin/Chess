import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface Props {
  to: string;
}

const NavLink: React.FC<Props> = ({ to, children }) => {
  const history = useHistory();
  const location = useLocation();

  const onClick = () => {
    history.push(to);
  };
  console.log(location);

  return <a onClick={onClick}>{children}</a>;
};

export default NavLink;
