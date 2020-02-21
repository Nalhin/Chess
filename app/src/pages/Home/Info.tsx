import React from 'react';
import { Button, Typography, useTheme } from '@material-ui/core';
import { Routes } from '../../interfaces/Router/Routes';
import styled from '@emotion/styled';
import { generatePlaceholderAccount } from '../../utils/generatePlaceholderAccount';
import { UserRegisterData } from '../../interfaces/User/User';
import { StyledQueueContainer } from './Queue/QueueShared';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userLoadingSelector } from '../../store/user/user.selectors';
import ButtonWithLoader from '../../components/ButtonWithLoader/ButtonWithLoader';

const StyledButton = styled(Button)`
  margin: ${props => props.theme.spacing(1)}px;
`;

const StyledButtonWithLoader = styled(ButtonWithLoader)`
  margin: ${props => props.theme.spacing(1)}px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface Props {
  registerUser: (data: UserRegisterData) => void;
}

const Info: React.FC<Props> = ({ registerUser }) => {
  const theme = useTheme();
  const isUserLoading = useSelector(userLoadingSelector);

  const handleRegisterUser = () => {
    registerUser(generatePlaceholderAccount());
  };

  return (
    <StyledQueueContainer data-testid="info">
      <Typography variant="body1">
        Account is required in order to play.
      </Typography>
      <StyledLink to={Routes.signUp}>
        <StyledButton variant="contained" color="primary" theme={theme}>
          Sign up
        </StyledButton>
      </StyledLink>
      <StyledButtonWithLoader
        theme={theme}
        isLoading={isUserLoading}
        onClick={handleRegisterUser}
      >
        Placeholder account
      </StyledButtonWithLoader>
    </StyledQueueContainer>
  );
};

export default Info;
