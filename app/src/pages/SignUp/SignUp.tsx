import React from 'react';
import { useDispatch } from 'react-redux';
import { UserRegisterData } from '../../interfaces/User';
import { registerUserRequested } from '../../store/user/user.actions';
import { StyledContainer, StyledLink, StyledWrapper } from '../SignIn/SignIn';
import { locations } from '../../contants/locations';
import { Button, TextField, useTheme } from '@material-ui/core';

const INITIAL_STATE = {
  login: '',
  password: '',
  email: '',
};

const SignUp = () => {
  const [formState, setFormState] = React.useState<UserRegisterData>(
    INITIAL_STATE,
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(registerUserRequested(formState));
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
          label="Email"
          name="email"
          onChange={onFormChange}
          value={formState.email}
        />
        <TextField
          label="Password"
          name="password"
          onChange={onFormChange}
          value={formState.password}
        />
        <StyledLink to={locations.signIn} theme={theme}>
          Sign in?
        </StyledLink>
        <Button color="primary" onClick={submitForm}>
          Sign up
        </Button>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default SignUp;
