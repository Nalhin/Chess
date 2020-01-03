import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import { UserLoginData } from '../../interfaces/User';
import Input from '../../components/Input/Input';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  login: '',
  password: '',
};

const StyledContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  width: 400px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0 ${props => props.theme.space.medium}px;
  text-align: right;
`;

const SignIn = () => {
  const [formState, setFormState] = React.useState<UserLoginData>(
    INITIAL_STATE,
  );
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(loginUserRequested(formState));
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <StyledContainer>
      <Input
        label="SignIn"
        name="login"
        onChange={onFormChange}
        value={formState.login}
      />
      <Input
        label="Password"
        name="password"
        onChange={onFormChange}
        value={formState.password}
      />
      <StyledLink to="/register">Don't have an account?</StyledLink>
      <Button onClick={submitForm}>Sign in</Button>
    </StyledContainer>
  );
};

export default SignIn;
