import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User';
import styled from '@emotion/styled';
import { Button, Card, TextField, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { locations } from '../../contants/locations';

const INITIAL_STATE = {
  login: '',
  password: '',
};

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 400px;
  margin: ${props => props.theme.spacing(4)}px auto;
  padding: ${props => props.theme.spacing(2)}px;
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing(0)}px
    ${props => props.theme.spacing(1)}px;
  text-align: right;
`;

const SignIn = () => {
  const [formState, setFormState] = React.useState<UserLoginData>(
    INITIAL_STATE,
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(loginUserRequested(formState));
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <StyledWrapper>
      <StyledContainer theme={theme}>
        <TextField
          label="Login"
          name="login"
          onChange={onFormChange}
          value={formState.login}
        />
        <TextField
          label="Password"
          name="password"
          onChange={onFormChange}
          value={formState.password}
        />
        <StyledLink to={locations.signUp} theme={theme}>
          Don't have an account?
        </StyledLink>
        <Button color="primary" onClick={submitForm}>
          Sign in
        </Button>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default SignIn;
