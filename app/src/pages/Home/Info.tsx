import React from 'react';
import { Button, Typography, useTheme } from '@material-ui/core';
import { StyledLink } from '../../components/StyledLink/StyledLink';
import { Routes } from '../../interfaces/Router/Routes';
import styled from '@emotion/styled';
import { generatePlaceholderAccount } from '../../utils/generatePlaceholderAccount';
import { UserRegisterData } from '../../interfaces/User/User';

const StyledButton = styled(Button)`
  margin: ${props => props.theme.spacing(1)}px;
`;

interface Props {
  registerUser: (data: UserRegisterData) => void;
}

const Info: React.FC<Props> = ({ registerUser }) => {
  const theme = useTheme();

  const handleRegisterUser = () => {
    registerUser(generatePlaceholderAccount());
  };

  return (
    <>
      <Typography variant="body1">
        Account is required in order to play.
      </Typography>
      <StyledLink to={Routes.signUp}>
        <StyledButton variant="contained" color="primary" theme={theme}>
          Register
        </StyledButton>
      </StyledLink>
      <StyledButton
        variant="contained"
        color="primary"
        theme={theme}
        onClick={handleRegisterUser}
      >
        Placeholder account
      </StyledButton>
    </>
  );
};

export default Info;
